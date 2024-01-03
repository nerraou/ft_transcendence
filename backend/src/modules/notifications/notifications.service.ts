import { Injectable } from "@nestjs/common";
import { ContactStatus, Prisma, PrismaClient } from "@prisma/client";
import { ITXClientDenyList } from "@prisma/client/runtime/library";

import { PrismaService } from "@common/modules/prisma/prisma.service";

type TransactionPrismaClient = Omit<PrismaClient, ITXClientDenyList>;

type ContactNotificationMetadata = Prisma.JsonObject & {
  type: "contact";
  id: number;
  status: ContactStatus;
};

type MessageNotificationMetadata = Prisma.JsonObject & {
  type: "message";
  sender: string;
};

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  createContactNotification(
    userId: number,
    prisma: TransactionPrismaClient,
    metadata?: ContactNotificationMetadata,
  ) {
    return prisma.notification.create({
      data: {
        userId,
        metadata: metadata,
      },
    });
  }

  createMessageNotification(id: number, metadata: MessageNotificationMetadata) {
    return this.prisma.notification.create({
      data: {
        userId: id,
        metadata: metadata,
      },
    });
  }

  markNotificationsAsRead(userId: number, ids: number[]) {
    return this.prisma.notification.updateMany({
      where: {
        userId: userId,
        id: {
          in: ids,
        },
      },
      data: {
        isRead: true,
      },
    });
  }

  getUserNotifications(userId: number, page: number, limit: number) {
    return this.prisma.notification.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  getUserNotificationsCount(userId: number) {
    return this.prisma.notification.count({
      where: {
        userId,
      },
    });
  }
}
