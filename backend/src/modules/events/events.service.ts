import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { ExtractJwt } from "passport-jwt";
import { Socket } from "socket.io";

import { RedisService } from "@common/modules/redis/redis.service";
import { AppEnv } from "@config/env-configuration";
import { JwtPayload } from "@modules/auth/strategies/jwt.strategy";
import { UsersService } from "@modules/users/users.service";

@Injectable()
export class EventsService {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AppEnv>,
    private readonly usersService: UsersService,
  ) {}

  async userConnected(client: Socket) {
    const payload = this.verifyJwt(client.request);

    if (!payload) {
      return client.disconnect();
    }

    await this.redisService.set(`user-${payload.sub}`, client.id);
    await this.usersService.updateStatusById(payload.sub, "ONLINE");
  }

  async userDisonnected(client: Socket) {
    const payload = this.verifyJwt(client.request);

    if (!payload) {
      throw new WsException("Unauthorized");
    }

    await this.redisService.del(`user-${payload.sub}`);
    await this.usersService.updateStatusById(payload.sub, "OFFLINE");
  }

  private verifyJwt(request: any): JwtPayload | undefined {
    const jwtToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (jwtToken) {
      try {
        const payload = this.jwtService.verify<JwtPayload>(jwtToken, {
          secret: this.configService.get("jwtSecret"),
        });
        return payload;
      } catch {
        return undefined;
      }
    }
  }
}
