import { Injectable } from "@nestjs/common";
import { Message, User } from "@prisma/client";

import { PrismaService } from "@common/modules/prisma/prisma.service";

import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  create(senderId: number, createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        senderId: senderId,
        receiverId: createMessageDto.receiverId,
        text: createMessageDto.text,
      },
    });
  }

  getMessagesByIds(messagesIds: number[]) {
    return this.prisma.message.findMany({
      where: {
        id: {
          in: messagesIds,
        },
      },
    });
  }

  markAsRead(messagesIds: number[]) {
    return this.prisma.message.updateMany({
      data: {
        isRead: true,
      },
      where: {
        id: {
          in: messagesIds,
        },
      },
    });
  }

  composeMessageSocketPayload(message: Message, user: User) {
    return {
      message: {
        id: message.id,
        text: message.text,
      },
      sender: {
        id: user.id,
        avatarPath: user.avatarPath,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}
