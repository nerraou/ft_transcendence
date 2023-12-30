import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  UseGuards,
} from "@nestjs/common";

import { PrismaService } from "@common/modules/prisma/prisma.service";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";

import { GetAchievementsApiDocumentation } from "./decorators/docs.decorator";

@Controller("achievements")
export class AchievementsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("/:username")
  @GetAchievementsApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getUserAchievements(@Param("username") username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new ForbiddenException();
    }

    return this.prisma.achievement.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}
