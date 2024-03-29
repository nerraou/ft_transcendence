import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { User as UserEntity } from "@prisma/client";

import { RedisService } from "@common/modules/redis/redis.service";
import { EventsGateway } from "@modules/events/events.gateway";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { User } from "@modules/users/decorators/user.decorators";
import { UsersService } from "@modules/users/users.service";

import { ContactsService } from "./contacts.service";
import UserExistsPipe from "./pipes/user-exists.pipe";
import { CreateContactDto } from "./dto/create-contact.dto";
import {
  AcceptContactApiDocumentation,
  DeclineContactApiDocumentation,
  CreateContactApiDocumentation,
  GetContactsApiDocumentation,
} from "./decorators/docs.decorator";
import { GetContactsDto } from "./dto/get-contacts.dto";

@Controller("contacts")
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly eventsGateway: EventsGateway,
    private readonly redisService: RedisService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @CreateContactApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async createContact(
    @Body(UserExistsPipe) contactToCreate: CreateContactDto,
    @User() connectedUser: UserEntity,
  ) {
    if (connectedUser.id == contactToCreate.userId) {
      throw new ForbiddenException();
    }

    const contact = await this.contactsService.findContactByUsersIds(
      connectedUser.id,
      contactToCreate.userId,
    );

    if (contact) {
      throw new ConflictException();
    }

    const isBlocked = await this.usersService.isUsersBlocked(
      connectedUser.id,
      contactToCreate.userId,
    );

    if (isBlocked) {
      throw new ForbiddenException();
    }

    const newContact = await this.contactsService.createContact(
      connectedUser.id,
      contactToCreate.userId,
      connectedUser.username,
    );

    const socketId = await this.redisService.get(
      `user-${contactToCreate.userId}`,
    );

    if (socketId) {
      this.eventsGateway.server
        .to(socketId)
        .emit(
          "contact-request-received",
          this.contactsService.composeContactRequestSocketPayload(
            connectedUser,
            newContact.id,
          ),
        );
    }

    return {
      message: "success",
      contactId: newContact.id,
    };
  }

  @Patch(":id([0-9]{1,11})/accept")
  @AcceptContactApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async acceptContactRequest(
    @Param("id", ParseIntPipe) contactId: number,
    @User() connectedUser: UserEntity,
  ) {
    const contact = await this.contactsService.findContactById(contactId);

    if (
      !contact ||
      contact.status == "ACCEPTED" ||
      connectedUser.id != contact.followingId
    ) {
      throw new ForbiddenException();
    }

    let userId = contact.followerId;

    if (userId == connectedUser.id) {
      userId = contact.followingId;
    }

    await this.contactsService.acceptContactRequest(
      contactId,
      userId,
      connectedUser.username,
    );

    const socketId = await this.redisService.get(`user-${contact.followerId}`);

    if (socketId) {
      this.eventsGateway.server
        .to(socketId)
        .emit(
          "contact-request-accepted",
          this.contactsService.composeContactRequestSocketPayload(
            connectedUser,
            contact.id,
          ),
        );
    }

    return {
      message: "success",
    };
  }

  @Patch(":id([0-9]{1,11})/decline")
  @DeclineContactApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async declineContactRequest(
    @Param("id", ParseIntPipe) contactId: number,
    @User() connectedUser: UserEntity,
  ) {
    try {
      await this.contactsService.deleteUserContactById(
        contactId,
        connectedUser.id,
      );
    } catch {}

    return {
      message: "success",
    };
  }

  @Get()
  @GetContactsApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getContacts(
    @User("id") userId: number,
    @Query() query: GetContactsDto,
  ) {
    const contacts = await this.contactsService.getUserContacts(
      userId,
      query.page,
      query.limit,
      query.searchQuery,
    );

    return {
      count: contacts.length,
      contacts: contacts,
    };
  }
}
