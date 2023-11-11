import { Injectable } from "@nestjs/common";

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

  confirmEmail(token: string) {
    return this.prisma.user.update({
      where: {
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
}
