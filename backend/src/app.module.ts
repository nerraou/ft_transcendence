import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { ServeStaticModule } from "@nestjs/serve-static";
import { resolve as resolvePath, join as joinPath } from "path";

import envConfigFactory from "@config/env-configuration";
import { UsersModule } from "@modules/users/users.module";
import { AuthModule } from "@modules/auth/auth.module";
import { EventsModule } from "@modules/events/events.module";
import { ContactsModule } from "@modules/contacts/contacts.module";
import { MessagesModule } from "@modules/messages/messages.module";
import { GamesModule } from "@modules/games/games.module";
import { GameLoopModule } from "@/modules/game-loop/game-loop.module";
import { PostsModule } from "@modules/posts/posts.module";

import { AppController } from "./app.controller";

@Module({
  imports: [
    MessagesModule,
    UsersModule,
    AuthModule,
    forwardRef(() => EventsModule),
    ContactsModule,
    GamesModule,
    GameLoopModule,
    PostsModule,
    ConfigModule.forRoot({
      load: [envConfigFactory],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: "/assets",
      rootPath: joinPath(__dirname, "..", "assets"),
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: `ponggame <${process.env.SMTP_USER}>`,
      },
      template: {
        dir: resolvePath("src", "email-templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
