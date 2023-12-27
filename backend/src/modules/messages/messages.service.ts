import { Injectable } from "@nestjs/common";
import { Message, User } from "@prisma/client";

import { PrismaService } from "@common/modules/prisma/prisma.service";

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  create(senderId: number, receiverId: number, text: string) {
    return this.prisma.message.create({
      data: {
        senderId: senderId,
        receiverId: receiverId,
        text: text,
      },
    });
  }

  getMessagesByUsernames(
    username1: string,
    username2: string,
    page: number,
    limit: number,
  ) {
    return this.prisma.message.findMany({
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarPath: true,
            status: true,
          },
        },
      },
      where: {
        OR: [
          {
            sender: {
              username: username1,
            },
            receiver: {
              username: username2,
            },
          },
          {
            sender: {
              username: username2,
            },
            receiver: {
              username: username1,
            },
          },
        ],
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  getMessagesByUsernamesCount(username1: string, username2: string) {
    return this.prisma.message.count({
      where: {
        OR: [
          {
            sender: {
              username: username1,
            },
            receiver: {
              username: username2,
            },
          },
          {
            sender: {
              username: username2,
            },
            receiver: {
              username: username1,
            },
          },
        ],
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
