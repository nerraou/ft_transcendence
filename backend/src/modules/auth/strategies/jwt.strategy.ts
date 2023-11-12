import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { User } from "@prisma/client";

import { UsersService } from "@modules/users/users.service";
import { AppEnv } from "@config/env-configuration";

export interface JwtPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    readonly configService: ConfigService<AppEnv>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("jwtSecret"),
    });
  }

  validate(payload: JwtPayload): Promise<User> {
    return this.usersService.findOneById(payload.sub);
  }
}
