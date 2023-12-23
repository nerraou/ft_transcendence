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
    FROM (SELECT RANK() OVER (ORDER BY rating DESC) as ranking, id FROM users) ranked_users
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
        googleAccountId: fortyTwoId,
      },
    });
  }

  async getLeaderboard(page: number, limit: number) {
    const getUsersQuery = Prisma.sql`
    SELECT id, username, email, status, rating,
      RANK() OVER (ORDER BY rating DESC) as ranking,
      first_name as "firstName", last_name as "lastName", avatar_path as "avatarPath",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM users
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
}
