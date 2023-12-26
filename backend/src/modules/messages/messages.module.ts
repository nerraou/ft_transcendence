import { Module } from "@nestjs/common";

import { PrismaModule } from "@common/modules/prisma/prisma.module";
import { RedisModule } from "@common/modules/redis/redis.module";
import { EventsModule } from "@modules/events/events.module";
import { UsersModule } from "@modules/users/users.module";

import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
  imports: [PrismaModule, EventsModule, RedisModule, UsersModule],
})
export class MessagesModule {}
