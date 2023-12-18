import { Module } from "@nestjs/common";

import { PrismaModule } from "@common/modules/prisma/prisma.module";

import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [PrismaModule],
})
export class PostsModule {}
