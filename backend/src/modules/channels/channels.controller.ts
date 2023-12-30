import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  PayloadTooLargeException,
  Post,
  Query,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
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
import { HashService } from "@common/services/hash.service";
import { AppEnv } from "@config/env-configuration";
import { ONE_MEGA } from "@common/constants";
import { ImageValidator } from "@common/ImageValidator";

import { CreateChannelDto } from "./dto/create-channel.dto";
import { JoinChannelDto } from "./dto/join-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { GetChannelMessagesDto } from "./dto/get-channel-messages.dto";
import { ChannelsService } from "./channels.service";
import {
  CreateChannelApiDocumentation,
  UpdateChannelApiDocumentation,
  GetChannelsApiDocumentation,
  JoinChannelApiDocumentation,
  GetChannelsMessagesApiDocumentation,
  UpdateChannelMemberStateApiDocumentation,
  MuteChannelMemberApiDocumentation,
} from "./decorators/docs.decorator";
import { BanMemberDto } from "./dto/ban-member.dto";
import { KickMemberDto } from "./dto/kick-member.dto";
import { MuteMemberDto } from "./dto/mute-member.dto";

const ImageValidatorPipe = new ParseFilePipeBuilder()
  .addMaxSizeValidator({
    maxSize: ONE_MEGA,
    message: "size",
  })
  .addValidator(new ImageValidator())
  .build({
    fileIsRequired: true,
    exceptionFactory(error) {
      if (error == "size") {
        return new PayloadTooLargeException();
      } else if (error == "type") {
        return new UnsupportedMediaTypeException();
      } else if (error == "File is required") {
        return new UnprocessableEntityException();
      }
    },
  });

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
    @UploadedFile(ImageValidatorPipe) file: Express.Multer.File,
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
    @UploadedFile(ImageValidatorPipe)
    file: Express.Multer.File,
  ) {
    let filename: string | undefined;

    const channel = await this.channelsService.findChannelByIdWithOwner(
      updateChannelDto.channelId,
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

  @Post("/join")
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

  @Get("/:id/messages")
  @GetChannelsMessagesApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getChannelMessages(
    @User() user: UserEntity,
    @Param("id", ParseIntPipe) channelId: number,
    @Query() getChannelMessagesDto: GetChannelMessagesDto,
  ) {
    const channelMember = await this.channelsService.findChannelMember(
      channelId,
      user.id,
    );

    if (
      !channelMember ||
      channelMember.state == "KICKED" ||
      channelMember.state == "BANNED"
    ) {
      throw new ForbiddenException();
    }

    const count = await this.channelsService.findChannelMessagesCount(
      channelId,
    );

    const messages = await this.channelsService.findChannelMessages(
      channelId,
      getChannelMessagesDto.page,
      getChannelMessagesDto.limit,
    );

    return {
      count,
      messages: messages.reverse(),
    };
  }

  @Patch("/members/ban")
  @UpdateChannelMemberStateApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async banMember(
    @User() user: UserEntity,
    @Body() banMemberDto: BanMemberDto,
  ) {
    const member = await this.channelsService.findChannelMember(
      banMemberDto.channelId,
      user.id,
    );

    const roles = ["OWNER", "ADMIN"];

    if (!member || !roles.includes(member.role)) {
      throw new ForbiddenException();
    }

    const memberToBan = await this.channelsService.findChannelMember(
      banMemberDto.channelId,
      banMemberDto.memberId,
    );

    if (memberToBan.role == "OWNER") {
      throw new ForbiddenException();
    }

    if (!memberToBan) {
      throw new ForbiddenException();
    }

    await this.channelsService.updateMemberState(
      banMemberDto.channelId,
      banMemberDto.memberId,
      "BANNED",
    );

    return {
      message: "success",
    };
  }

  @Patch("/members/kick")
  @UpdateChannelMemberStateApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async kickMember(
    @User() user: UserEntity,
    @Body() kickMemberDto: KickMemberDto,
  ) {
    const member = await this.channelsService.findChannelMember(
      kickMemberDto.channelId,
      user.id,
    );

    const roles = ["OWNER", "ADMIN"];

    if (!member || !roles.includes(member.role)) {
      throw new ForbiddenException();
    }

    const memberToKick = await this.channelsService.findChannelMember(
      kickMemberDto.channelId,
      kickMemberDto.memberId,
    );

    if (memberToKick.role == "OWNER") {
      throw new ForbiddenException();
    }

    if (!memberToKick) {
      throw new ForbiddenException();
    }

    await this.channelsService.updateMemberState(
      kickMemberDto.channelId,
      kickMemberDto.memberId,
      "KICKED",
    );

    return {
      message: "success",
    };
  }

  @Patch("/members/mute")
  @MuteChannelMemberApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async muteMember(
    @User() user: UserEntity,
    @Body() muteMemberDto: MuteMemberDto,
  ) {
    const member = await this.channelsService.findChannelMember(
      muteMemberDto.channelId,
      user.id,
    );

    const roles = ["OWNER", "ADMIN"];

    if (!member || !roles.includes(member.role)) {
      throw new ForbiddenException();
    }

    const memberToMute = await this.channelsService.findChannelMember(
      muteMemberDto.channelId,
      muteMemberDto.memberId,
    );

    if (memberToMute.role == "OWNER") {
      throw new ForbiddenException();
    }

    if (!memberToMute) {
      throw new ForbiddenException();
    }

    await this.channelsService.muteMember(
      muteMemberDto.channelId,
      muteMemberDto.memberId,
      muteMemberDto.minutes,
    );

    return {
      message: "success",
    };
  }
}
