import { Injectable } from "@nestjs/common";

import { PrismaService } from "@common/modules/prisma/prisma.service";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
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
}
