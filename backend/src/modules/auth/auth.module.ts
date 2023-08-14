import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

import { PrismaService } from "@common/services/prisma.service";
import { HashService } from "@common/services/hash.service";
import { ImageService } from "@common/services/image.service";
import { UsersModule } from "@modules/users/users.module";

import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    HashService,
    ImageService,
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UsersModule,
    PassportModule,
  ],
})
export class AuthModule {}
