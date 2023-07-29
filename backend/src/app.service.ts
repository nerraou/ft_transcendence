import { AppEnv } from "@config/env-configuration";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService<AppEnv>,
    private readonly prismaService: PrismaService,
  ) {}
  getHello(): { message: string } {
    return { message: "Hello World!" };
  }

  async getUsers(): Promise<{ users: Array<any> }> {
    const users = await this.prismaService.user.findMany();
    return { users };
  }
}
