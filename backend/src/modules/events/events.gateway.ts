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
import { Mutex } from "async-mutex";

import { User } from "@modules/users/decorators/user.decorators";
import { GameLoopService } from "@modules/game-loop/game-loop.service";
import { GamesService } from "@modules/games/games.service";
import { PlayerEntity } from "@modules/game-loop/types";
import { UsersService } from "@modules/users/users.service";
import { ChannelsService } from "@modules/channels/channels.service";
import Game from "@modules/game-loop/classes/Game";

import { EventsService } from "./events.service";
import { WSJwtAuthGuard } from "./guards/ws-jwt-auth.guard";
import { CreateChannelMessageDto } from "@modules/channels/dto/create-channel-message.dto";

type EventName =
  | "message"
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
  private playersQueue: Map<number, PlayerEntity[]> = new Map();
  private playersQueueMutex = new Mutex();

  constructor(
    private readonly eventsService: EventsService,
    private readonly gameLoopService: GameLoopService,
    private readonly gamesService: GamesService,
    private readonly usersService: UsersService,
    private readonly channelsService: ChannelsService,
  ) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    return this.eventsService.userConnected(client);

    // TODO: broadcast online status using client.broadcast.emit()
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    let game: Game | undefined;

    // this.gameLoopService.playerDisconnected(client.data.gameId);

    if (client.data.gameId) {
      game = this.gameLoopService.getGameById(client.data.gameId);
    }

    if (game) {
      if (game.player.score != 0 || game.opponent.score != 0) {
        if (client.id == game.player.socketId) {
          game.events.emit("game-over", {
            winnerId: game.opponent.id,
            status: "abandoned",
          });
        } else {
          game.events.emit("game-over", {
            winnerId: game.player.id,
            status: "abandoned",
          });
        }
      } else {
        this.server.to(client.data.gameId).emit("game-aborted");
      }

      this.gameLoopService.removeGame(client.data.gameId);
    } else if ("scoreToWin" in client.data) {
      try {
        await this.playersQueueMutex.waitForUnlock();
        await this.playersQueueMutex.acquire();

        const queue = this.playersQueue.get(client.data.scoreToWin);

        if (queue) {
          const index = queue.findIndex(
            (player) => player.socketId == client.id,
          );

          if (index != -1) {
            queue.splice(index, 1);
          }
        }
      } catch (error) {
        console.error("events.gateway - handleConnection", error.message);
      } finally {
        this.playersQueueMutex.release();
      }
    }

    this.eventsService.userDisonnected(client).catch(() => {
      console.error("failed to update disconnect data");
    });

    // TODO: broadcast online status using client.broadcast.emit()
  }

  @SubscribeMessage<EventName>("message")
  @UseGuards(WSJwtAuthGuard)
  onMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ) {
    console.log(user);

    console.log(data);
  }

  @SubscribeMessage<EventName>("channel-chat-message")
  @UseGuards(WSJwtAuthGuard)
  async onChatChannelMessage(
    @MessageBody()
    createChannelMessageDto: CreateChannelMessageDto,
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ) {
    const { channelId } = createChannelMessageDto;

    const channelMember = await this.channelsService.findChannelMember(
      channelId,
      user.id,
    );

    if (!channelMember) {
      throw new WsException("not a member");
    }

    if (channelMember.state == "BANNED" || channelMember.state == "KICKED") {
      throw new WsException(
        `can't send send message reason: ${channelMember.state}`,
      );
    }

    if (channelMember.mutedUntil) {
      const now = new Date();
      if (channelMember.mutedUntil < now) {
        throw new WsException("member is muted");
      }
    }

    await this.channelsService.createChannelMessage(
      user.id,
      createChannelMessageDto,
    );

    const channeRoomName = `chat-channel-${channelId}`;

    const sockets = await this.server.in(channeRoomName).fetchSockets();

    const usersIds = sockets.map((socket) => socket.data.userId);

    const blockedUsers = await this.usersService.findUserBlockListByIds(
      user.id,
      usersIds,
    );

    sockets.forEach((socket) => {
      const isBlocked = !!blockedUsers.find(
        (user) =>
          user.blocked == socket.data.userId ||
          user.blockedBy == socket.data.userId,
      );

      if (!isBlocked) {
        client.to(socket.id).emit("channel-chat-message", {
          ...createChannelMessageDto,
          user: {
            id: user.id,
            username: user.username,
            avatarPath: user.avatarPath,
          },
        });
      }
    });
  }

  @SubscribeMessage<EventName>("player-join-queue")
  @UseGuards(WSJwtAuthGuard)
  async onPlayerJoinQueue(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
    @User() user: UserEntity,
  ) {
    try {
      await this.playersQueueMutex.waitForUnlock();
      await this.playersQueueMutex.acquire();

      const { scoreToWin } = data;
      client.data.scoreToWin = scoreToWin;

      const playersQueue = this.playersQueue.get(scoreToWin);

      const ranking = await this.usersService.getUserRanking(user.id);

      const incommingPlayer: PlayerEntity = {
        id: user.id,
        rating: user.rating,
        socketId: client.id,
        avatar: user.avatarPath,
        username: user.username,
        ranking,
      };

      if (!playersQueue) {
        this.playersQueue.set(scoreToWin, [incommingPlayer]);
      } else if (playersQueue.length == 0) {
        playersQueue.push(incommingPlayer);
      } else {
        const player = playersQueue.shift();
        const opponent: PlayerEntity = {
          id: user.id,
          rating: user.rating,
          socketId: client.id,
          avatar: user.avatarPath,
          username: user.username,
          ranking,
        };

        const game = this.gameLoopService.createGame(
          player,
          opponent,
          data.scoreToWin,
        );

        const playerSocket = this.server.sockets.sockets.get(player.socketId);
        const opponentSocket = this.server.sockets.sockets.get(
          opponent.socketId,
        );

        playerSocket.data.gameId = game.getSocketRoomName();
        opponentSocket.data.gameId = game.getSocketRoomName();

        playerSocket.join(game.getSocketRoomName());
        opponentSocket.join(game.getSocketRoomName());

        game.events.on("game-debug", (data) =>
          this.server.to(game.getSocketRoomName()).emit("game-debug", data),
        );

        game.events.on("game-started", (data: any) => {
          this.server.to(game.getSocketRoomName()).emit("game-started", data);
        });

        game.events.on("ball-moved", (data: any) => {
          this.server.to(game.getSocketRoomName()).emit("ball-moved", data);
        });

        game.events.on("ball-out", (data: any) => {
          this.server.to(game.getSocketRoomName()).emit("ball-out", data);
        });

        game.events.on("game-over", (data: any) => {
          this.gamesService
            .createGame({
              startedAt: game.startedAt,
              winner: data.winnerId == player.id ? "PLAYER" : "OPPONENT",
              player: {
                id: game.player.id,
                rating: game.player.rating,
                score: game.player.score,
                ranking: game.player.ranking,
              },
              opponent: {
                id: game.opponent.id,
                rating: game.opponent.rating,
                score: game.opponent.score,
                ranking: game.opponent.ranking,
              },
            })
            .catch((e) => {
              console.log("cannot create game", e);
            });
          this.gameLoopService.removeGame(game.getId());
          this.server.to(game.getSocketRoomName()).emit("game-over", data);
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.playersQueueMutex.release();
    }
  }

  @SubscribeMessage<EventName>("player-moved")
  @UseGuards(WSJwtAuthGuard)
  onMove(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ) {
    const { gameId, y } = data;

    const game = this.gameLoopService.getGameById(gameId);

    if (!game) {
      return;
    }

    if (user.id == game.player.id) {
      game.player.paddle.position.y = y;

      client
        .to(game.opponent.socketId)
        .emit("opponent-moved", { y: game.player.paddle.position.y });
    } else {
      game.opponent.paddle.position.y = y;

      client
        .to(game.player.socketId)
        .emit("opponent-moved", { y: game.opponent.paddle.position.y });
    }
  }
}
