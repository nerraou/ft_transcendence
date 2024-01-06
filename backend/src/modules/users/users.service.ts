import { Injectable } from "@nestjs/common";
import { Prisma, User, UserStatus } from "@prisma/client";

import { PrismaService } from "@common/modules/prisma/prisma.service";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { CreateUserWithGoogleDto } from "./dto/create-user-with-google.dto";
import { CreateUserWithFortyTwoDto } from "./dto/create-user-with-forty-two.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  createWithGoogle(createUserWithGoogleDto: CreateUserWithGoogleDto) {
    return this.prisma.user.create({
      data: {
        ...createUserWithGoogleDto,
        isEmailVerified: true,
      },
    });
  }

  createWithFortyTwo(createUserWithFortyTwoDto: CreateUserWithFortyTwoDto) {
    return this.prisma.user.create({
      data: {
        ...createUserWithFortyTwoDto,
        isEmailVerified: true,
      },
    });
  }

  updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateProfileDto,
    });
  }

  updatePassword(id: number, password: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }

  updateEmail(id: number, email: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });
  }

  updateGoogleAccountIdById(id: number, googleAccountId: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        googleAccountId,
      },
    });
  }

  updateFortyTwoAccountIdById(id: number, fortyTwoAccountId: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        fortyTwoAccountId,
      },
    });
  }

  updateStatusById(id: number, status: UserStatus) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  updateAvatarPath(id: number, avatarPath: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        avatarPath,
      },
    });
  }

  confirmEmail(email: string, token: string) {
    return this.prisma.user.update({
      where: {
        email,
        verifyEmailToken: token,
      },
      data: {
        isEmailVerified: true,
        verifyEmailToken: null,
      },
    });
  }

  enable2FA(userId: number, secret: string) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        is2faEnabled: true,
        tfaSecret: secret,
      },
    });
  }

  disable2FA(userId: number) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        is2faEnabled: false,
        tfaSecret: null,
      },
    });
  }

  findOneById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserRanking(id: number) {
    const sqlQuery = Prisma.sql`SELECT ranking
    FROM (SELECT RANK() OVER (ORDER BY rating DESC, created_at DESC, id ASC) as ranking, id FROM users) ranked_users
    WHERE id = ${id}`;

    const data = await this.prisma.$queryRaw<{ ranking: number }[]>(sqlQuery);

    return Number(data.at(0).ranking);
  }

  findOneByGoogleId(googleId: string) {
    return this.prisma.user.findUnique({
      where: {
        googleAccountId: googleId,
      },
    });
  }

  findOneByFortyTwoId(fortyTwoId: string) {
    return this.prisma.user.findUnique({
      where: {
        fortyTwoAccountId: fortyTwoId,
      },
    });
  }

  async getLeaderboard(page: number, limit: number) {
    const getUsersQuery = Prisma.sql`
    SELECT id, username, email, status, rating,
      RANK() OVER (ORDER BY rating DESC, created_at DESC, id ASC) as ranking,
      first_name as "firstName", last_name as "lastName", avatar_path as "avatarPath",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM users
    WHERE username IS NOT NULL
    ORDER BY ranking ASC
    OFFSET ${(page - 1) * limit} 
    LIMIT ${limit}
    `;

    const users = await this.prisma.$queryRaw<User[]>(getUsersQuery);

    return users;
  }

  usersCount() {
    return this.prisma.user.count();
  }

  findChannelsIds(id: number) {
    return this.prisma.channelMember.findMany({
      where: {
        memberId: id,
      },
    });
  }

  findUserBlockListByIds(userId: number, usersIds: number[]) {
    return this.prisma.block.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                blocked: userId,
              },
              {
                blockedBy: userId,
              },
            ],
          },
          {
            OR: [
              {
                blocked: {
                  in: usersIds,
                },
              },
              {
                blockedBy: {
                  in: usersIds,
                },
              },
            ],
          },
        ],
      },
    });
  }

  blockUser(userToBlock: number, blockedBy: number) {
    return this.prisma.$transaction([
      this.prisma.block.create({
        data: {
          blocked: userToBlock,
          blockedBy: blockedBy,
        },
      }),
      this.unfriendUser(userToBlock, blockedBy),
    ]);
  }

  unblockUser(userToUnblock: number, blockedBy: number) {
    return this.prisma.block.delete({
      where: {
        blocked_blockedBy: {
          blocked: userToUnblock,
          blockedBy: blockedBy,
        },
      },
    });
  }

  unfriendUser(userId: number, userToUnfriend: number) {
    return this.prisma.contact.deleteMany({
      where: {
        OR: [
          {
            followerId: userId,
            followingId: userToUnfriend,
          },
          {
            followerId: userToUnfriend,
            followingId: userId,
          },
        ],
      },
    });
  }

  async getUserGamesStats(id: number) {
    const gamesCount = await this.prisma.game.aggregate({
      _count: true,
      where: {
        OR: [
          {
            playerId: id,
          },
          {
            opponentId: id,
          },
        ],
      },
    });

    if (gamesCount._count == 0) {
      return {
        wins: 0,
        losses: 0,
        winsPercentage: 0,
        lossesPercentage: 0,
      };
    }

    const winsCount = await this.prisma.game.aggregate({
      _count: true,
      where: {
        OR: [
          {
            playerId: id,
            winner: "PLAYER",
          },
          {
            opponentId: id,
            winner: "OPPONENT",
          },
        ],
      },
    });

    const lossesCount = gamesCount._count - winsCount._count;

    const winsPercentage = (winsCount._count * 100) / gamesCount._count;
    const lossesPercentage = (lossesCount * 100) / gamesCount._count;

    return {
      wins: winsCount._count,
      losses: lossesCount,
      winsPercentage,
      lossesPercentage,
    };
  }

  async getWinsCount(userId: number) {
    const winsCount = await this.prisma.game.aggregate({
      _count: true,
      where: {
        OR: [
          {
            playerId: userId,
            winner: "PLAYER",
          },
          {
            opponentId: userId,
            winner: "OPPONENT",
          },
        ],
      },
    });

    return winsCount._count;
  }

  async findLastRankedPlayer() {
    const getUsersQuery = Prisma.sql`
    SELECT id, username, email, status, rating,
      RANK() OVER (ORDER BY rating DESC, created_at DESC, id ASC) as ranking,
      first_name as "firstName", last_name as "lastName", avatar_path as "avatarPath",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM users
    ORDER BY ranking DESC
    LIMIT 1
    `;

    const users = await this.prisma.$queryRaw<User[]>(getUsersQuery);

    if (users.length != 0) {
      return users[0];
    }

    return null;
  }

  async isUsersFriend(connectedUserId: number, userId: number) {
    const count = await this.prisma.contact.count({
      where: {
        OR: [
          {
            followerId: connectedUserId,
            followingId: userId,
          },
          {
            followerId: userId,
            followingId: connectedUserId,
          },
        ],
      },
    });

    return count == 1;
  }

  async isUsersBlocked(connectedUserId: number, userId: number) {
    const count = await this.prisma.block.count({
      where: {
        OR: [
          {
            blocked: connectedUserId,
            blockedBy: userId,
          },
          {
            blocked: userId,
            blockedBy: connectedUserId,
          },
        ],
      },
    });

    return count == 1;
  }

  async searchUsers(
    searchQuery: string,
    channelId: number,
    connectedUserId: number,
  ) {
    const blockedUsers = await this.prisma.block.findMany({
      where: {
        OR: [
          {
            blocked: connectedUserId,
          },
          {
            blockedBy: connectedUserId,
          },
        ],
      },
      select: {
        blocked: true,
        blockedBy: true,
      },
    });

    const channelMemebersIds = await this.prisma.channelMember.findMany({
      where: {
        channelId,
      },
    });

    const excludeIds: number[] = [];

    blockedUsers.forEach((block) => {
      excludeIds.push(block.blocked);
      excludeIds.push(block.blockedBy);
    });

    channelMemebersIds.forEach((member) => {
      excludeIds.push(member.memberId);
    });

    return this.prisma.user.findMany({
      where: {
        username: {
          startsWith: searchQuery,
          mode: "insensitive",
        },
        id: {
          notIn: excludeIds,
        },
      },
      select: {
        id: true,
        username: true,
        avatarPath: true,
        status: true,
      },
      take: 10,
    });
  }
}
