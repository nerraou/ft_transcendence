import { Injectable } from "@nestjs/common";

import { PrismaService } from "@common/services/prisma.service";

import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
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
