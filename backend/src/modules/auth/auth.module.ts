import { Module } from "@nestjs/common";

import { HashService } from "@common/services/hash.service";
import { ImageService } from "@common/services/image.service";
import { UsersModule } from "@modules/users/users.module";
import { RedisModule } from "@common/modules/redis/redis.module";

import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { FortyTwoStrategy } from "./strategies/forty-two.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    HashService,
    ImageService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    FortyTwoStrategy,
  ],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_AUTH_SECRET,
    }),
    UsersModule,
    PassportModule,
    RedisModule,
  ],
})
export class AuthModule {}
