import { Module } from "@nestjs/common";

import { PrismaModule } from "@common/modules/prisma/prisma.module";
import { UsersModule } from "@modules/users/users.module";
import { EventsModule } from "@modules/events/events.module";
import { RedisModule } from "@common/modules/redis/redis.module";
import { NotificationsModule } from "@modules/notifications/notifications.module";

import { ContactsService } from "./contacts.service";
import { ContactsController } from "./contacts.controller";

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [
    PrismaModule,
    UsersModule,
    EventsModule,
    RedisModule,
    NotificationsModule,
  ],
})
export class ContactsModule {}
