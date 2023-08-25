import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { UseGuards } from "@nestjs/common";
import { Socket } from "socket.io";
import { User as UserEntity } from "@prisma/client";

import { User } from "@modules/users/decorators/user.decorators";

import { EventsService } from "./events.service";
import { WSJwtAuthGuard } from "./guards/ws-jwt-auth.guard";

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly eventsService: EventsService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    return this.eventsService.userConnected(client);

    // TODO: broadcast online status using client.broadcast.emit()
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.eventsService.userDisonnected(client.id);

    // TODO: broadcast online status using client.broadcast.emit()
  }

  @SubscribeMessage("message")
  @UseGuards(WSJwtAuthGuard)
  onMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ) {
    console.log(user);

    console.log(data);
  }
}
