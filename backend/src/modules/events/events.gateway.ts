import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { UseGuards } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { User as UserEntity } from "@prisma/client";

import { User } from "@modules/users/decorators/user.decorators";
import { GameLoopService } from "@modules/game-loop/game-loop.service";
import { GamesService } from "@modules/games/games.service";
import { PlayerEntity } from "@modules/game-loop/types";

import { EventsService } from "./events.service";
import { WSJwtAuthGuard } from "./guards/ws-jwt-auth.guard";
import Game from "@modules/game-loop/classes/Game";

type EventName = "message" | "player-join-queue" | "player-moved";

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private playersQueue: PlayerEntity[] = [];

  constructor(
    private readonly eventsService: EventsService,
    private readonly gameLoopService: GameLoopService,
    private readonly gamesService: GamesService,
  ) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    return this.eventsService.userConnected(client);

    // TODO: broadcast online status using client.broadcast.emit()
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    let game: Game | undefined;

    if (client.data.gameId) {
      game = this.gameLoopService.getGameById(client.data.gameId);
    }

    if (game) {
      if (game.player.score != 0 || game.opponent.score != 0) {
        if (client.id == game.player.socketId) {
          game.events.emit("game-over", { winnerId: game.opponent.id });
        } else {
          game.events.emit("game-over", { winnerId: game.player.id });
        }
      } else {
        this.server.to(client.data.gameId).emit("game-aborted");
      }

      this.gameLoopService.removeGame(client.data.gameId);
    }

    this.eventsService.userDisonnected(client).catch(() => {
      console.log("failed to update disconnect data");
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

  @SubscribeMessage<EventName>("player-join-queue")
  @UseGuards(WSJwtAuthGuard)
  onPlayerJoinQueue(
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ) {
    if (this.playersQueue.length == 0) {
      this.playersQueue.push({
        id: user.id,
        rating: user.rating,
        socketId: client.id,
      });
    } else {
      const player = this.playersQueue.shift();
      const opponent: PlayerEntity = {
        id: user.id,
        rating: user.rating,
        socketId: client.id,
      };

      const game = this.gameLoopService.createGame(player, opponent);

      const playerSocket = this.server.sockets.sockets.get(player.socketId);
      const opponentSocket = this.server.sockets.sockets.get(opponent.socketId);

      playerSocket.data.gameId = game.getSocketRoomName();
      opponentSocket.data.gameId = game.getSocketRoomName();

      playerSocket.join(game.getSocketRoomName());
      opponentSocket.join(game.getSocketRoomName());

      game.events.on("game-started", (data: any) => {
        this.server.to(game.getSocketRoomName()).emit("game-started", data);
      });

      game.events.on("ball-moved", (data: any) => {
        this.server.to(game.getSocketRoomName()).emit("ball-moved", data);
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
            },
            opponent: {
              id: game.opponent.id,
              rating: game.opponent.rating,
              score: game.opponent.score,
            },
          })
          .catch((e) => {
            console.log("cannot create game", e);
          });

        this.gameLoopService.removeGame(game.getId());
        this.server.to(game.getSocketRoomName()).emit("game-over", data);
      });
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
