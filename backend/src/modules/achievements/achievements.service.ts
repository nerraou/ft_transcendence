import { PrismaService } from "@common/modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

export interface Achievement {
  userId: number;
  name: string;
}

@Injectable()
export class AchievementsService {
  constructor(private readonly prisma: PrismaService) {}

  claimAchievements(achievements: Achievement[]) {
    return this.prisma.achievement.createMany({
      skipDuplicates: true,
      data: achievements,
    });
  }
}
