import { Module } from "@nestjs/common";

import { PrismaModule } from "@common/modules/prisma/prisma.module";

import { AchievementsService } from "./achievements.service";
import { AchievementsController } from "./achievements.controller";

@Module({
  providers: [AchievementsService],
  imports: [PrismaModule],
  exports: [AchievementsService],
  controllers: [AchievementsController],
})
export class AchievementsModule {}
