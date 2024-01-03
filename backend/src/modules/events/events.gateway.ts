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
import { JwtService } from "@nestjs/jwt";

import { User } from "@modules/users/decorators/user.decorators";
import { CreateMessageDto } from "@modules/messages/dto/create-message.dto";
import { CreateChannelMessageDto } from "@modules/channels/dto/create-channel-message.dto";
import { MovePlayerDto } from "@modules/game-loop/dto/move-player.dto";
import { JoinQueueDto } from "@modules/game-loop/dto/join-queue.dto";
import { ChallengePlayerDto } from "@modules/game-loop/dto/challenge-player.dto";

import { EventsService } from "./events.service";
import { WSJwtAuthGuard } from "./guards/ws-jwt-auth.guard";
import { ChallengePlayerResponseDto } from "@modules/game-loop/dto/challenge-player-response.dto";
import { CancelChallengePlayerDto } from "@modules/game-loop/dto/cancel-challenge-player.dto";

type EventName =
  | "direct-message"
  | "player-join-queue"
  | "player-moved"
  | "channel-chat-message"
  | "challenge-player"
  | "challenge-player-response"
  | "challenge-player-cancel"
  | "leave-queue";

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

  constructor(
    private readonly eventsService: EventsService,
    private readonly jwtService: JwtService,
  ) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    return this.eventsService.userConnected(client);

    // TODO: broadcast online status using client.broadcast.emit()
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    this.eventsService.handleGameAbandoned(client).catch((e) => {
      console.error("handleGameAbandoned: failed to update disconnect data", e);
    });

    this.eventsService.userDisonnected(client).catch((e) => {
      console.error("userDisonnected:", e);
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

  @SubscribeMessage<EventName>("challenge-player")
  @UseGuards(WSJwtAuthGuard)
  challengePlayer(
    @MessageBody() challengePlayerDto: ChallengePlayerDto,
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ) {
    return this.eventsService.handleChallengePlayer(
      client,
      user,
      challengePlayerDto,
    );
  }

  @SubscribeMessage<EventName>("challenge-player-response")
  @UseGuards(WSJwtAuthGuard)
  acceptChallenge(
    @MessageBody() challengePlayerResponseDto: ChallengePlayerResponseDto,
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ) {
    try {
      if (challengePlayerResponseDto.action == "accept") {
        const { socketId, username, scoreToWin } = this.jwtService.verify(
          challengePlayerResponseDto.token,
          {
            secret: "some-random-string",
          },
        );

        return this.eventsService.acceptChallenge(
          client,
          user,
          socketId,
          username,
          scoreToWin,
          this.server,
          challengePlayerResponseDto.token,
        );
      } else {
        return this.eventsService.cancelChallenge(
          challengePlayerResponseDto.token,
        );
      }
    } catch {}
  }

  @SubscribeMessage<EventName>("challenge-player-cancel")
  @UseGuards(WSJwtAuthGuard)
  cancelChallenge(
    @MessageBody() cancelChallengePlayerDto: CancelChallengePlayerDto,
  ) {
    try {
      this.jwtService.verify(cancelChallengePlayerDto.token, {
        secret: "some-random-string",
      });

      this.eventsService.cancelChallenge(cancelChallengePlayerDto.token);
    } catch {}
  }

  @SubscribeMessage<EventName>("leave-queue")
  @UseGuards(WSJwtAuthGuard)
  leaveQueue(@ConnectedSocket() client: Socket) {
    return this.eventsService.leaveQueue(client);
  }
}
