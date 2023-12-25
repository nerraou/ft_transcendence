import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { User as UserEntity } from "@prisma/client";
import { FileInterceptor } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { writeFile } from "fs/promises";
import { v4 as uuid4 } from "uuid";

import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { User } from "@modules/users/decorators/user.decorators";
import { FileSizeValidationPipe } from "@modules/users/pipes/file-size-validation.pipe";
import { AppEnv } from "@config/env-configuration";

import { CreateChannelDto } from "./dto/create-channel.dto";
import { ChannelsService } from "./channels.service";
import { CreateChannelApiDocumentation } from "./decorators/docs.decorator";

@Controller("channels")
export class ChannelsController {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly configService: ConfigService<AppEnv>,
  ) {}

  @Post()
  @CreateChannelApiDocumentation()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  async createChannel(
    @User() user: UserEntity,
    @Body() createChannelDto: CreateChannelDto,
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
  ) {
    const filename = uuid4() + ".png";
    const imagePath = `${this.configService.get("imagesPath")}/${filename}`;

    await writeFile(imagePath, file.buffer);

    const channel = await this.channelsService.createChannel(
      user.id,
      createChannelDto,
      filename,
    );

    return {
      id: channel.id,
    };
  }
}
