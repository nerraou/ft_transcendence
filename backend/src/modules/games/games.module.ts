import { Module } from "@nestjs/common";

import { PrismaModule } from "@common/modules/prisma/prisma.module";
import { UsersModule } from "@modules/users/users.module";

import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";

@Module({
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
  imports: [PrismaModule, UsersModule],
})
export class GamesModule {}
