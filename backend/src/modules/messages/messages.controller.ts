import {
  Controller,
  Body,
  Patch,
  ForbiddenException,
  UseGuards,
  Get,
  Param,
  Query,
} from "@nestjs/common";
import { User as UserEntity } from "@prisma/client";

import { User } from "@modules/users/decorators/user.decorators";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { RedisService } from "@common/modules/redis/redis.service";
import { UsersService } from "@modules/users/users.service";

import { MessagesService } from "./messages.service";
import { MarkAsReadMessageDto } from "./dto/mark-as-read-message.dto";
import {
  ReadMessagesApiDocumentation,
  GetDirectMessagesApiDocumentation,
} from "./decorators/docs.decorator";
import { GetMessagesDto } from "./dto/get-messages.dto";

@Controller("/users/messages")
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly redisService: RedisService,
    private readonly usersSerivces: UsersService,
  ) {}

  @Get("/:username")
  @GetDirectMessagesApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getDirectMessages(
    @User() user: UserEntity,
    @Param("username") username: string,
    @Query() getMessagesDto: GetMessagesDto,
  ) {
    const count = await this.messagesService.getMessagesByUsernamesCount(
      user.username,
      username,
    );

    const messages = await this.messagesService.getMessagesByUsernames(
      user.username,
      username,
      getMessagesDto.page,
      getMessagesDto.limit,
    );

    return {
      count,
      messages: messages.reverse(),
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
