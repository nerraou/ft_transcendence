import { Injectable } from "@nestjs/common";

import { PrismaService } from "@common/modules/prisma/prisma.service";
import { HashService } from "@common/services/hash.service";

import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { CreateChannelMessageDto } from "./dto/create-channel-message.dto";

@Injectable()
export class ChannelsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async createChannel(
    userId: number,
    createChannelDto: CreateChannelDto,
    imagePath: string,
  ) {
    let hashedPassword: string | undefined;

    if (createChannelDto.type == "PROTECTED") {
      hashedPassword = await this.hashService.hash(createChannelDto.password);
    }

    return this.prisma.channel.create({
      data: {
        creatorId: userId,
        name: createChannelDto.name,
        description: createChannelDto.description,
        imagePath: imagePath,
        type: createChannelDto.type,
        password: hashedPassword,
        members: {
          create: {
            role: "OWNER",
            memberId: userId,
          },
        },
      },
    });
  }

  async updateChannel(updateChannelDto: UpdateChannelDto, imagePath?: string) {
    let hashedPassword: string | undefined;

    console.log(updateChannelDto);

    if (updateChannelDto.type == "PROTECTED") {
      hashedPassword = await this.hashService.hash(updateChannelDto.password);
    } else {
      hashedPassword = null;
    }

    return this.prisma.channel.update({
      data: {
        name: updateChannelDto.name,
        description: updateChannelDto.description,
        type: updateChannelDto.type,
        password: hashedPassword,
        imagePath: imagePath,
      },
      where: {
        id: updateChannelDto.channeldId,
      },
    });
  }

  joinChannel(userId: number, channelId: number) {
    return this.prisma.channelMember.create({
      data: {
        channelId: channelId,
        memberId: userId,
        role: "MEMBER",
      },
    });
  }

  createChannelMessage(
    memberId: number,
    createChannelMessageDto: CreateChannelMessageDto,
  ) {
    return this.prisma.channelMessage.create({
      data: {
        senderId: memberId,
        channelId: createChannelMessageDto.channelId,
        message: createChannelMessageDto.message,
      },
    });
  }

  async isChannelMember(channelId: number, userId: number) {
    const count = await this.prisma.channelMember.count({
      where: {
        channelId: channelId,
        memberId: userId,
      },
    });

    return count != 0;
  }

  findChannelById(channelId: number) {
    return this.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });
  }

  findChannelByIdWithOwner(channelId: number) {
    return this.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
      include: {
        members: {
          where: {
            role: "OWNER",
          },
        },
      },
    });
  }

  findUserChannels(userId: number) {
    return this.prisma.channel.findMany({
      where: {
        members: {
          some: {
            memberId: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        imagePath: true,
        type: true,
        membersCount: true,
      },
    });
  }

  findChannelMember(channelId: number, userId: number) {
    return this.prisma.channelMember.findUnique({
      where: {
        channelId_memberId: {
          channelId,
          memberId: userId,
        },
      },
    });
  }
}
