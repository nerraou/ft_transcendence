import { Module, forwardRef } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersModule } from "@modules/users/users.module";
import { RedisModule } from "@common/modules/redis/redis.module";
import { GameLoopModule } from "@modules/game-loop/game-loop.module";
import { GamesModule } from "@modules/games/games.module";

import { EventsService } from "./events.service";
import { EventsGateway } from "./events.gateway";

@Module({
  providers: [EventsGateway, EventsService, JwtService],
  exports: [EventsGateway, EventsService],
  imports: [
    forwardRef(() => UsersModule),
    RedisModule,
    GameLoopModule,
    GamesModule,
  ],
})
export class EventsModule {}
