import { Module } from "@nestjs/common";

import { PrismaModule } from "@common/modules/prisma/prisma.module";
import { HashService } from "@common/services/hash.service";

import { ChannelsController } from "./channels.controller";
import { ChannelsService } from "./channels.service";

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService, HashService],
  imports: [PrismaModule],
  exports: [ChannelsService],
})
export class ChannelsModule {}
