import { Injectable } from "@nestjs/common";

import { PrismaService } from "@common/modules/prisma/prisma.service";
import { User as UserEntity } from "@prisma/client";

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  createContact(connectedUserId: number, followingId: number) {
    return this.prisma.contact.create({
      data: {
        followerId: connectedUserId,
        followingId,
      },
    });
  }

  findContactByUsersIds(followerId: number, followingId: number) {
    return this.prisma.contact.findFirst({
      where: {
        OR: [
          { followerId: followerId, followingId: followingId },
          { followerId: followingId, followingId: followerId },
        ],
      },
    });
  }

  findContactById(id: number) {
    return this.prisma.contact.findUnique({
      where: {
        id,
      },
    });
  }

  acceptContactRequest(id: number) {
    return this.prisma.contact.update({
      where: {
        id,
      },
      data: {
        status: "ACCEPTED",
      },
    });
  }

  removeContactRequest(id: number) {
    return this.prisma.contact.delete({
      where: {
        id,
      },
    });
  }

  composeContactRequestSocketPayload(user: UserEntity, contactId: number) {
    return {
      contactId: contactId,
      userId: user.id,
      avatarPath: user.avatarPath,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
