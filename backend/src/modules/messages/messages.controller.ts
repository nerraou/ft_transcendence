import {
  Controller,
  Body,
  Patch,
  ForbiddenException,
  UseGuards,
  Post,
} from "@nestjs/common";
import { User } from "@modules/users/decorators/user.decorators";

import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";

import { MessagesService } from "./messages.service";
import { MarkAsReadMessageDto } from "./dto/mark-as-read-message.dto";
import {
  CreateMessageApiDocumentation,
  ReadMessagesApiDocumentation,
} from "./decorators/docs.decorator";
import { CreateMessageDto } from "./dto/create-message.dto";
import { User as UserEntity } from "@prisma/client";
import { RedisService } from "@common/modules/redis/redis.service";
import { EventsGateway } from "@modules/events/events.gateway";

@Controller("/users/messages")
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly redisService: RedisService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Post("/")
  @CreateMessageApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @User() connectedUser: UserEntity,
  ) {
    const message = await this.messagesService.create(
      connectedUser.id,
      createMessageDto,
    );

    const socketId = await this.redisService.get(
      `user-${createMessageDto.receiverId}`,
    );

    if (socketId) {
      this.eventsGateway.server
        .to(socketId)
        .emit(
          "message",
          this.messagesService.composeMessageSocketPayload(
            message,
            connectedUser,
          ),
        );
    }

    return {
      message: "success",
      messageId: message.id,
    };
  }

  @Patch("/read")
  @ReadMessagesApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async markAsRead(
    @Body() markAsReadMessageDto: MarkAsReadMessageDto,
    @User("id") connectedUserId: number,
  ) {
    const messages = await this.messagesService.getMessagesByIds(
      markAsReadMessageDto.messagesIds,
    );

    messages.forEach((message) => {
      if (message.receiverId != connectedUserId) {
        throw new ForbiddenException();
      }
    });

    await this.messagesService.markAsRead(markAsReadMessageDto.messagesIds);

    return {
      message: "success",
    };
  }
}
