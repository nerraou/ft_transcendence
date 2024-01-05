import { AppEnv, RedisEnv } from "@config/env-configuration";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SetOptions, createClient } from "redis";

type RedisClient = ReturnType<typeof createClient>;

type RedisCommandArgument = string | Buffer;

@Injectable()
export class RedisService implements OnModuleInit {
  private client: RedisClient;

  constructor(private readonly configService: ConfigService<AppEnv>) {}

  async onModuleInit() {
    const redisEnv = this.configService.get<RedisEnv>("redis");

    this.client = createClient({
      url: `redis://${redisEnv.host}:${redisEnv.port}`,
    });

    await this.client.connect();
  }

  get(key: RedisCommandArgument) {
    return this.client.get(key);
  }

  set(
    key: RedisCommandArgument,
    value: RedisCommandArgument | number,
    options?: SetOptions,
  ) {
    return this.client.set(key, value, options);
  }

  del(key: RedisCommandArgument) {
    return this.client.del(key);
  }
}
