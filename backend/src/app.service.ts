import { AppEnv, DatabaseEnv } from "@config/env-configuration";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService<AppEnv>) {}
  getHello(): { message: string } {
    console.log(this.configService.get<DatabaseEnv>("database"));
    return { message: "Hello World!" };
  }
}
