import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ExtractJwt } from "passport-jwt";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { User } from "@prisma/client";

import { AppEnv } from "@config/env-configuration";
import { JwtPayload } from "@modules/auth/strategies/jwt.strategy";
import { UsersService } from "@modules/users/users.service";

@Injectable()
export class WSJwtAuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AppEnv>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socketClient = context.switchToWs().getClient<
      Socket & {
        user: User;
      }
    >();

    try {
      const jwtToken = ExtractJwt.fromAuthHeaderAsBearerToken()(
        socketClient.request as any,
      );

      const payload = this.jwtService.verify<JwtPayload>(jwtToken, {
        secret: this.configService.get("jwtSecret"),
      });

      socketClient.user = await this.usersService.findOneById(payload.sub);

      return true;
    } catch (error) {
      throw new WsException("Unauthorized");
    }
  }
}
