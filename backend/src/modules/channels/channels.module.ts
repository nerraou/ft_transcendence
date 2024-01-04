import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { PrismaModule } from "@common/modules/prisma/prisma.module";
import { HashService } from "@common/services/hash.service";
import { NotificationsModule } from "@modules/notifications/notifications.module";

import { ChannelsController } from "./channels.controller";
import { ChannelsService } from "./channels.service";
import { UsersModule } from "@modules/users/users.module";

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService, HashService, JwtService],
  exports: [ChannelsService],
  imports: [PrismaModule, NotificationsModule, UsersModule],
})
export class ChannelsModule {}
