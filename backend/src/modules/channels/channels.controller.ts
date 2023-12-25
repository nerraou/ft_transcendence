import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Patch,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { User as UserEntity } from "@prisma/client";
import { FileInterceptor } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { writeFile, unlink } from "fs/promises";
import { v4 as uuid4 } from "uuid";

import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { User } from "@modules/users/decorators/user.decorators";
import {
  FileSizeValidationPipe,
  ONE_MEGA,
} from "@modules/users/pipes/file-size-validation.pipe";
import { HashService } from "@common/services/hash.service";
import { AppEnv } from "@config/env-configuration";

import { CreateChannelDto } from "./dto/create-channel.dto";
import { JoinChannelDto } from "./dto/join-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { ChannelsService } from "./channels.service";
import {
  CreateChannelApiDocumentation,
  UpdateChannelApiDocumentation,
  GetChannelsApiDocumentation,
  JoinChannelApiDocumentation,
} from "./decorators/docs.decorator";

@Controller("channels")
export class ChannelsController {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly configService: ConfigService<AppEnv>,
    private readonly hashService: HashService,
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

  @Patch()
  @UpdateChannelApiDocumentation()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  async updateChannel(
    @User() user: UserEntity,
    @Body() updateChannelDto: UpdateChannelDto,
    @UploadedFile(
      new FileSizeValidationPipe({ maxSize: ONE_MEGA, isOptional: true }),
    )
    file: Express.Multer.File,
  ) {
    let filename: string | undefined;

    const channel = await this.channelsService.findChannelByIdWithOwner(
      updateChannelDto.channeldId,
    );

    if (!channel) {
      throw new ForbiddenException();
    }

    const [channelOwner] = channel.members;

    if (channelOwner.memberId != user.id) {
      throw new ForbiddenException();
    }

    if (file) {
      filename = uuid4() + ".png";

      const imagePath = `${this.configService.get("imagesPath")}/${filename}`;

      await writeFile(imagePath, file.buffer);

      const oldImagePath = `${this.configService.get("imagesPath")}/${
        channel.imagePath
      }`;
      unlink(oldImagePath).catch(console.error);
    }

    await this.channelsService.updateChannel(updateChannelDto, filename);

    return {
      message: "success",
    };
  }

  @Get()
  @GetChannelsApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getChannels(@User("id") userId: number) {
    const channels = await this.channelsService.findUserChannels(userId);

    return {
      channels,
    };
  }

  @Post("join")
  @JoinChannelApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async joinChannel(
    @User("id") userId: number,
    @Body() joinChannel: JoinChannelDto,
  ) {
    const channel = await this.channelsService.findChannelById(
      joinChannel.channelId,
    );

    if (!channel) {
      throw new ForbiddenException();
    }

    if (channel.type == "PROTECTED") {
      if (!joinChannel.password) {
        throw new ForbiddenException();
      }

      const isIdentical = await this.hashService.compare(
        joinChannel.password,
        channel.password,
      );

      if (!isIdentical) {
        throw new UnauthorizedException();
      }
    }

    const isChannelMember = await this.channelsService.isChannelMember(
      channel.id,
      userId,
    );

    if (isChannelMember) {
      throw new ForbiddenException();
    }

    await this.channelsService.joinChannel(userId, channel.id);

    return {
      message: "success",
    };
  }
}
