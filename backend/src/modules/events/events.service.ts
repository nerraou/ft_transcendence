import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { ExtractJwt } from "passport-jwt";
import { Server, Socket } from "socket.io";
import { Mutex } from "async-mutex";
import { GameWinner, User as UserEntity } from "@prisma/client";

import { RedisService } from "@common/modules/redis/redis.service";
import { AppEnv } from "@config/env-configuration";
import { JwtPayload } from "@modules/auth/strategies/jwt.strategy";
import { UsersService } from "@modules/users/users.service";
import { PlayerEntity } from "@modules/game-loop/types";
import Game from "@modules/game-loop/classes/Game";
import { GameLoopService } from "@modules/game-loop/game-loop.service";
import { CreateMessageDto } from "@modules/messages/dto/create-message.dto";
import { MessagesService } from "@modules/messages/messages.service";
import { MovePlayerDto } from "@modules/game-loop/dto/move-player.dto";
import { CreateChannelMessageDto } from "@modules/channels/dto/create-channel-message.dto";
import { ChannelsService } from "@modules/channels/channels.service";
import {
  Achievement,
  AchievementsService,
} from "@modules/achievements/achievements.service";
import { GamesService } from "@modules/games/games.service";
import { JoinQueueDto } from "@modules/game-loop/dto/join-queue.dto";
import claimAchievements from "./utils/claimAchievements";

@Injectable()
export class EventsService {
  private playersQueue: Map<number, PlayerEntity[]> = new Map();
  private playersQueueMutex = new Mutex();

  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AppEnv>,
    private readonly usersService: UsersService,
    private readonly gameLoopService: GameLoopService,
    private readonly messagesService: MessagesService,
    private readonly channelsService: ChannelsService,
    private readonly gamesService: GamesService,
    private readonly achievementsService: AchievementsService,
  ) {}

  async userConnected(client: Socket) {
    const payload = this.verifyJwt(client.request);

    if (!payload) {
      return client.disconnect();
    }

    client.data.userId = payload.sub;

    await this.redisService.set(`user-${payload.sub}`, client.id);
    this.usersService.updateStatusById(payload.sub, "ONLINE").catch(() => {
      console.log("couldn't update user status");
    });

    const channels = await this.usersService.finsChannelsIds(payload.sub);

    channels.forEach((channel) => {
      const channeRoomName = `chat-channel-${channel.channelId}`;
      client.join(channeRoomName);
    });
  }

  async userDisonnected(client: Socket) {
    const payload = this.verifyJwt(client.request);

    if (!payload) {
      throw new WsException("Unauthorized");
    }

    await this.redisService.del(`user-${payload.sub}`);
    await this.usersService.updateStatusById(payload.sub, "OFFLINE");
  }

  async handleGameAbandoned(client: Socket) {
    let game: Game | undefined;

    if (client.data.gameId) {
      game = this.gameLoopService.getGameById(client.data.gameId);
    }

    if (game) {
      this.removeFromGameLoop(client, game);
    } else if ("scoreToWin" in client.data) {
      await this.removeFromPlayersQueue(client);
    }
  }

  async handleDirectMessages(
    user: UserEntity,
    client: Socket,
    createMessageDto: CreateMessageDto,
  ) {
    const receiver = await this.usersService.findOneByUsername(
      createMessageDto.username,
    );

    if (!receiver) {
      throw new WsException("receiver not found");
    }

    const message = await this.messagesService.create(
      user.id,
      receiver.id,
      createMessageDto.text,
    );

    const socketId = await this.redisService.get(`user-${receiver.id}`);

    if (socketId) {
      client
        .to(socketId)
        .emit(
          "message",
          this.messagesService.composeMessageSocketPayload(message, user),
        );
    }
  }

  async handleChannelMessages(
    client: Socket,
    user: UserEntity,
    createChannelMessageDto: CreateChannelMessageDto,
    serverSocket: Server,
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

    const sockets = await serverSocket.in(channeRoomName).fetchSockets();

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

  async handlePlayerJoinQueue(
    client: Socket,
    user: UserEntity,
    joinQueueDto: JoinQueueDto,
    serverSocket: Server,
  ) {
    try {
      await this.playersQueueMutex.waitForUnlock();
      await this.playersQueueMutex.acquire();

      const { scoreToWin } = joinQueueDto;
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
          joinQueueDto.scoreToWin,
        );

        const playerSocket = serverSocket.sockets.sockets.get(player.socketId);
        const opponentSocket = serverSocket.sockets.sockets.get(
          opponent.socketId,
        );

        playerSocket.data.gameId = game.getSocketRoomName();
        opponentSocket.data.gameId = game.getSocketRoomName();

        playerSocket.join(game.getSocketRoomName());
        opponentSocket.join(game.getSocketRoomName());

        game.events.on("game-debug", (data) =>
          serverSocket.to(game.getSocketRoomName()).emit("game-debug", data),
        );

        game.events.on("game-started", (data: any) => {
          serverSocket.to(game.getSocketRoomName()).emit("game-started", data);
        });

        game.events.on("ball-moved", (data: any) => {
          serverSocket.to(game.getSocketRoomName()).emit("ball-moved", data);
        });

        game.events.on("ball-out", (data: any) => {
          serverSocket.to(game.getSocketRoomName()).emit("ball-out", data);
        });

        game.events.on("game-over", (data: any) => {
          const winner = data.winnerId == player.id ? "PLAYER" : "OPPONENT";

          this.claimAchievements(game, winner, data.winnerId).catch(() => {
            console.error("can't claim achievements");
          });

          this.gameLoopService.removeGame(game.getId());
          serverSocket.to(game.getSocketRoomName()).emit("game-over", data);
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.playersQueueMutex.release();
    }
  }

  handlePlayerMovement(client: Socket, user: UserEntity, data: MovePlayerDto) {
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

  removeFromGameLoop(client: Socket, game: Game) {
    if (game.player.score != 0 || game.opponent.score != 0) {
      let winnerId: number;

      if (client.id == game.player.socketId) {
        winnerId = game.opponent.id;
      } else {
        winnerId = game.player.id;
      }

      game.events.emit("game-over", {
        winnerId,
        status: "abandoned",
      });
    } else {
      client.to(client.data.gameId).emit("game-aborted");
    }

    this.gameLoopService.removeGame(client.data.gameId);
  }

  async removeFromPlayersQueue(client: Socket) {
    try {
      await this.playersQueueMutex.waitForUnlock();
      await this.playersQueueMutex.acquire();

      const queue = this.playersQueue.get(client.data.scoreToWin);

      if (queue) {
        const index = queue.findIndex((player) => player.socketId == client.id);

        if (index != -1) {
          queue.splice(index, 1);
        }
      }
    } catch (error) {
      console.error("removeFromPlayersQueue", error.message);
    } finally {
      this.playersQueueMutex.release();
    }
  }

  async claimAchievements(game: Game, winner: GameWinner, winnerId: number) {
    await this.gamesService.createGame({
      startedAt: game.startedAt,
      winner: winner,
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
    });

    const playerAchievements: Achievement[] = await claimAchievements(
      game.player,
      game.opponent,
      this.usersService,
      winnerId,
    );

    const opponentAchievements: Achievement[] = await claimAchievements(
      game.opponent,
      game.player,
      this.usersService,
      winnerId,
    );

    await this.achievementsService.claimAchievements([
      ...playerAchievements,
      ...opponentAchievements,
    ]);
  }

  private verifyJwt(request: any): JwtPayload | undefined {
    const jwtToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (jwtToken) {
      try {
        const payload = this.jwtService.verify<JwtPayload>(jwtToken, {
          secret: this.configService.get("jwtSecret"),
        });
        return payload;
      } catch {
        return undefined;
      }
    }
  }
}
