import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "@modules/users/users.service";
import { PrismaService } from "@common/services/prisma.service";

import { HashService } from "@common/services/hash.service";
import { ImageService } from "@common/services/image.service";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    HashService,
    ImageService,
  ],
})
export class AuthModule {}
