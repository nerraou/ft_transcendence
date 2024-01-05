import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "@prisma/client";

import { UsersService } from "@modules/users/users.service";

export interface AuthJWTPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("jwt.authSecret"),
    });
  }

  validate(payload: AuthJWTPayload): Promise<User> {
    return this.usersService.findOneById(payload.sub);
  }
}
