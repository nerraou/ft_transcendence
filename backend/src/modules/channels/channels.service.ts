import { Injectable } from "@nestjs/common";

import { PrismaService } from "@common/modules/prisma/prisma.service";
import { CreateChannelDto } from "./dto/create-channel.dto";

@Injectable()
export class ChannelsService {
  constructor(private readonly prisma: PrismaService) {}

  createChannel(
    userId: number,
    createChannelDto: CreateChannelDto,
    imagePath: string,
  ) {
    return this.prisma.channel.create({
      data: {
        creatorId: userId,
        name: createChannelDto.name,
        description: createChannelDto.description,
        imagePath: imagePath,
        type: createChannelDto.type,
        password: createChannelDto.password,
        members: {
          create: {
            role: "OWNER",
            memberId: userId,
          },
        },
      },
    });
  }
}
