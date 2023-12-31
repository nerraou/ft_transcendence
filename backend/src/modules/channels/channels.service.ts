import { Injectable } from "@nestjs/common";
import { ChannelMemberRole, ChannelMemberState } from "@prisma/client";

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
        id: updateChannelDto.channelId,
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

  updateMemberState(
    channelId: number,
    memberId: number,
    state: ChannelMemberState,
  ) {
    return this.prisma.channelMember.update({
      where: {
        channelId_memberId: {
          channelId,
          memberId,
        },
      },
      data: {
        state,
      },
    });
  }

  muteMember(channelId: number, memberId: number, minutes: number) {
    const mutedUntil = new Date(Date.now() + minutes * 60 * 1000);

    return this.prisma.channelMember.update({
      where: {
        channelId_memberId: {
          channelId,
          memberId,
        },
      },
      data: {
        mutedUntil,
      },
    });
  }

  updateMemberRole(
    channelId: number,
    memberId: number,
    role: ChannelMemberRole,
  ) {
    return this.prisma.channelMember.update({
      where: {
        channelId_memberId: {
          channelId,
          memberId,
        },
      },
      data: {
        role,
      },
    });
  }

  findChannelMembers(channelId: number) {
    return this.prisma.channelMember.findMany({
      where: {
        channelId,
        state: null,
      },
      include: {
        member: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarPath: true,
            rating: true,
          },
        },
      },
    });
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

  findChannelMessages(channelId: number, page: number, limit: number) {
    return this.prisma.channelMessage.findMany({
      where: {
        channelId: channelId,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
      include: {
        sender: {
          select: {
            id: true,
            state: true,
            mutedUntil: true,
            createdAt: true,
            member: {
              select: {
                id: true,
                avatarPath: true,
                username: true,
                rating: true,
              },
            },
          },
        },
      },
    });
  }

  findChannelMessagesCount(channelId: number) {
    return this.prisma.channelMessage.count({
      where: {
        channelId: channelId,
      },
    });
  }
}
