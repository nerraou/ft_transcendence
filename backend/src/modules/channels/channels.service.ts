import { Injectable } from "@nestjs/common";

import { PrismaService } from "@common/modules/prisma/prisma.service";
import { HashService } from "@common/services/hash.service";

import { CreateChannelDto } from "./dto/create-channel.dto";

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

  joinChannel(userId: number, channelId: number) {
    return this.prisma.channelMember.create({
      data: {
        channelId: channelId,
        memberId: userId,
        role: "MEMBER",
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
}
