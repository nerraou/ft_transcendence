import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "@modules/auth/auth.module";
import { UsersModule } from "@modules/users/users.module";
import envConfigFactory from "@config/env-configuration";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { resolve as resolvePath } from "path";

import { EventsModule } from "./modules/events/events.module";
import { ContactsModule } from "./modules/contacts/contacts.module";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    EventsModule,
    ConfigModule.forRoot({
      load: [envConfigFactory],
      isGlobal: true,
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
    ContactsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
