import { Injectable } from "@nestjs/common";

import { PrismaService } from "@common/modules/prisma/prisma.service";
import { Contact, Prisma, User, User as UserEntity } from "@prisma/client";

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

  async getUserContacts(userId: number, page: number, limit: number) {
    const getContactsQuery = Prisma.sql`
    SELECT id, status, follower_id as "followerId", following_id as "followingId",
          created_at as "createdAt", updated_at as "updatedAt"
    FROM contacts
    WHERE follower_id = ${userId} OR following_id = ${userId}`;
    const contacts = await this.prisma.$queryRaw<Contact[]>(getContactsQuery);

    if (contacts.length == 0) {
      return [];
    }

    const usersContactsIds = contacts.reduce<number[]>((ids, contact) => {
      if (contact.followerId != userId) {
        ids.push(contact.followerId);
      }

      if (contact.followingId != userId) {
        ids.push(contact.followingId);
      }

      return ids;
    }, []);

    let getContactsUsersQuery: Prisma.Sql;

    if (limit) {
      getContactsUsersQuery = Prisma.sql`
      SELECT id, username, email, status, rating,
        RANK() OVER (ORDER BY rating DESC) as ranking,
        first_name as "firstName", last_name as "lastName", avatar_path as "avatarPath",
        created_at as "createdAt", updated_at as "updatedAt"
      FROM users
      WHERE id IN (${Prisma.join(usersContactsIds)})
      OFFSET ${(page - 1) * limit} 
      LIMIT ${limit}`;
    } else {
      getContactsUsersQuery = Prisma.sql`
      SELECT id, username, email, status, rating,
        RANK() OVER (ORDER BY rating DESC) as ranking,
        first_name as "firstName", last_name as "lastName", avatar_path as "avatarPath",
        created_at as "createdAt", updated_at as "updatedAt"
      FROM users
      WHERE id IN (${Prisma.join(usersContactsIds)})`;
    }

    const users = await this.prisma.$queryRaw<User[]>(getContactsUsersQuery);

    return users;
  }
}
