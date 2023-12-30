import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayDisconnect,
  WebSocketServer,
  WsException,
} from "@nestjs/websockets";
import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { User as UserEntity } from "@prisma/client";

import { User } from "@modules/users/decorators/user.decorators";
import { CreateMessageDto } from "@modules/messages/dto/create-message.dto";
import { CreateChannelMessageDto } from "@modules/channels/dto/create-channel-message.dto";
import { MovePlayerDto } from "@modules/game-loop/dto/move-player.dto";
import { JoinQueueDto } from "@modules/game-loop/dto/join-queue.dto";

import { EventsService } from "./events.service";
import { WSJwtAuthGuard } from "./guards/ws-jwt-auth.guard";

type EventName =
  | "direct-message"
  | "player-join-queue"
  | "player-moved"
  | "channel-chat-message";

@WebSocketGateway({ cors: true })
@UsePipes(
  new ValidationPipe({
    exceptionFactory(error) {
      return new WsException(error);
    },
  }),
)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly eventsService: EventsService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    return this.eventsService.userConnected(client);

    // TODO: broadcast online status using client.broadcast.emit()
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    this.eventsService.handleGameAbandoned(client).catch((e) => {
      console.error("handleGameAbandoned: failed to update disconnect data", e);
    });

    this.eventsService.userDisonnected(client).catch((e) => {
      console.error("userDisonnected: failed to update disconnect data", e);
    });

    // TODO: broadcast online status using client.broadcast.emit()
  }

  @SubscribeMessage<EventName>("direct-message")
  @UseGuards(WSJwtAuthGuard)
  onDirectMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ) {
    return this.eventsService.handleDirectMessages(
      user,
      client,
      createMessageDto,
    );
  }

  @SubscribeMessage<EventName>("channel-chat-message")
  @UseGuards(WSJwtAuthGuard)
  onChatChannelMessage(
    @MessageBody()
    createChannelMessageDto: CreateChannelMessageDto,
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ) {
    return this.eventsService.handleChannelMessages(
      client,
      user,
      createChannelMessageDto,
      this.server,
    );
  }

  @SubscribeMessage<EventName>("player-join-queue")
  @UseGuards(WSJwtAuthGuard)
  async onPlayerJoinQueue(
    @ConnectedSocket() client: Socket,
    @MessageBody() joinQueueDto: JoinQueueDto,
    @User() user: UserEntity,
  ) {
    return this.eventsService.handlePlayerJoinQueue(
      client,
      user,
      joinQueueDto,
      this.server,
    );
  }

  @SubscribeMessage<EventName>("player-moved")
  @UseGuards(WSJwtAuthGuard)
  onMove(
    @MessageBody() data: MovePlayerDto,
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ) {
    return this.eventsService.handlePlayerMovement(client, user, data);
  }
}
