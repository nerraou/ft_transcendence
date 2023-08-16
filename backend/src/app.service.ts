import { Injectable } from "@nestjs/common";
import { PrismaService } from "@common/services/prisma.service";

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  getHello(): { message: string } {
    return { message: "Hello World!" };
  }

  async getUsers(): Promise<{ users: Array<any> }> {
    const users = await this.prismaService.user.findMany();
    return { users };
  }
}
