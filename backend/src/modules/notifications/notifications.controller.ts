import { Body, Controller, Get, Patch, Query, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { User } from "@modules/users/decorators/user.decorators";

import {
  GetNotificationsApiDocumentation,
  MarkNotificationsAsReadyApiDocumentation,
} from "./decorators/docs.decorator";
import { GetNotificationsQueryDto } from "./dto/get-notifications-query.dto";
import { NotificationsService } from "./notifications.service";
import { MarkNotificationsAsReadDto } from "./dto/mark-notifications-as-read.dto";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @GetNotificationsApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getNotifications(
    @User("id") userId: number,
    @Query() query: GetNotificationsQueryDto,
  ) {
    const count = await this.notificationsService.getUserNotificationsCount(
      userId,
    );

    const notifications = await this.notificationsService.getUserNotifications(
      userId,
      query.page,
      query.limit,
    );

    return {
      count,
      notifications,
    };
  }

  @Patch("/read")
  @MarkNotificationsAsReadyApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async markNotificationsAsRead(
    @User("id") userId: number,
    @Body() markNotificationsAsReadDto: MarkNotificationsAsReadDto,
  ) {
    await this.notificationsService.markNotificationsAsRead(
      userId,
      markNotificationsAsReadDto.ids,
    );

    return {
      message: "success",
    };
  }
}
