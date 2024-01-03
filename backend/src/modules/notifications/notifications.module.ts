import { Module } from "@nestjs/common";

import { PrismaModule } from "@common/modules/prisma/prisma.module";

import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [PrismaModule],
  exports: [NotificationsService],
})
export class NotificationsModule {}
