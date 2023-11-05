import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { ExtractJwt } from "passport-jwt";
import { Socket } from "socket.io";

import { RedisService } from "@common/modules/redis/redis.service";
import { AppEnv } from "@config/env-configuration";
import { JwtPayload } from "@modules/auth/strategies/jwt.strategy";

@Injectable()
export class EventsService {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AppEnv>,
  ) {}

  userConnected(client: Socket) {
    const payload = this.verifyJwt(client.request);

    if (!payload) {
      return client.disconnect();
    }

    return this.redisService.set(payload.sub.toString(), client.id);
  }

  userDisonnected(client: Socket) {
    const payload = this.verifyJwt(client.request);

    if (!payload) {
      throw new WsException("Unauthorized");
    }

    return this.redisService.del(payload.sub.toString());
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
