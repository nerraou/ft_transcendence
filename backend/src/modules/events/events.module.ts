import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersModule } from "@modules/users/users.module";
import { RedisModule } from "@common/modules/redis/redis.module";

import { EventsService } from "./events.service";
import { EventsGateway } from "./events.gateway";

@Module({
  providers: [EventsGateway, EventsService, JwtService],
  exports: [EventsGateway, EventsService],
  imports: [UsersModule, RedisModule],
})
export class EventsModule {}
