import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
import { HashService } from "@common/services/hash.service";
import { AppEnv } from "@config/env-configuration";
import { buildParseFilePipe } from "@common/ImageValidator";

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
  ChangeChannelMemberRoleApiDocumentation,
  GetChannelMembersApiDocumentation,
  GetPublicChannelsApiDocumentation,
  LeaveChannelApiDocumentation,
  GetChannelApiDocumentation,
} from "./decorators/docs.decorator";
import { BanMemberDto } from "./dto/ban-member.dto";
import { KickMemberDto } from "./dto/kick-member.dto";
import { MuteMemberDto } from "./dto/mute-member.dto";
import { ChangeMemberRoleDto } from "./dto/change-member-role.dto";
import { GetPublicChannelsDto } from "./dto/get-public-channels.dto";
import { LeaveChannelDto } from "./dto/leave-channel.dto";

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
    @UploadedFile(buildParseFilePipe({ required: true }))
    file: Express.Multer.File,
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
    @UploadedFile(buildParseFilePipe({ required: false }))
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

  @Get("/public")
  @GetPublicChannelsApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getPublicChannels(@Query() getPublicChannelsDto: GetPublicChannelsDto) {
    const channels = await this.channelsService.findPublicChannels(
      getPublicChannelsDto.searchQuery,
    );

    return {
      channels,
    };
  }

  @Get("/:id([0-9]{1,11})")
  @GetChannelApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getChannel(
    @User("id") userId: number,
    @Param("id", ParseIntPipe) channelId: number,
  ) {
    const member = await this.channelsService.findChannelMember(
      channelId,
      userId,
    );

    if (!member) {
      throw new ForbiddenException();
    }

    const channel = await this.channelsService.findChannelById(channelId);

    delete channel.password;

    return channel;
  }

  @Get("/:id([0-9]{1,11})/members")
  @GetChannelMembersApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getChannelMembers(
    @User("id") userId: number,
    @Param("id", ParseIntPipe) channelId: number,
  ) {
    const member = await this.channelsService.findChannelMember(
      channelId,
      userId,
    );

    if (!member) {
      throw new ForbiddenException();
    }

    const members = await this.channelsService.findChannelMembers(channelId);

    return {
      members,
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

  @Patch("/leave")
  @LeaveChannelApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async leaveChannel(
    @User("id") userId: number,
    @Body() leaveChannelDto: LeaveChannelDto,
  ) {
    const channel = await this.channelsService.findChannelById(
      leaveChannelDto.channelId,
    );

    if (!channel) {
      throw new ForbiddenException();
    }

    await this.channelsService.leaveChannel(userId, channel.id);

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
    if (user.id == banMemberDto.memberId) {
      throw new ForbiddenException();
    }

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
    if (user.id == kickMemberDto.memberId) {
      throw new ForbiddenException();
    }

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
    if (user.id == muteMemberDto.memberId) {
      throw new ForbiddenException();
    }

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

  @Patch("/members/role")
  @ChangeChannelMemberRoleApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async changeMemberRole(
    @User() user: UserEntity,
    @Body() changeMemberRoleDto: ChangeMemberRoleDto,
  ) {
    if (user.id == changeMemberRoleDto.memberId) {
      throw new ForbiddenException();
    }

    const member = await this.channelsService.findChannelMember(
      changeMemberRoleDto.channelId,
      user.id,
    );

    const roles = ["OWNER"];

    if (!member || !roles.includes(member.role)) {
      throw new ForbiddenException();
    }

    const memberToUpdate = await this.channelsService.findChannelMember(
      changeMemberRoleDto.channelId,
      changeMemberRoleDto.memberId,
    );

    if (!memberToUpdate) {
      throw new ForbiddenException();
    }

    await this.channelsService.updateMemberRole(
      changeMemberRoleDto.channelId,
      changeMemberRoleDto.memberId,
      changeMemberRoleDto.role,
    );

    return {
      message: "success",
    };
  }
}
