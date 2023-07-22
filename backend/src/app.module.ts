import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import envConfigFactory from "@config/env-configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfigFactory],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
