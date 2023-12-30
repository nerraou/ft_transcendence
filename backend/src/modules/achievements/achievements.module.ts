import { Module } from "@nestjs/common";

import { PrismaModule } from "@common/modules/prisma/prisma.module";

import { AchievementsService } from "./achievements.service";

@Module({
  providers: [AchievementsService],
  imports: [PrismaModule],
  exports: [AchievementsService],
})
export class AchievementsModule {}
