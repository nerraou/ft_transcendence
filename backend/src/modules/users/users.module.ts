import { Module } from "@nestjs/common";

import { PrismaModule } from "@common/modules/prisma/prisma.module";
import { HashService } from "@common/services/hash.service";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, HashService],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
