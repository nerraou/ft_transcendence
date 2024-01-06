import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { ExtractJwt } from "passport-jwt";
import { Server, Socket } from "socket.io";
import { Mutex } from "async-mutex";
import { GameWinner, User as UserEntity, UserStatus } from "@prisma/client";

import { RedisService } from "@common/modules/redis/redis.service";
import { AppEnv, JWTEnv } from "@config/env-configuration";
import { AuthJWTPayload } from "@modules/auth/strategies/jwt.strategy";
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
import { ChallengePlayerDto } from "@modules/game-loop/dto/challenge-player.dto";
import { NotificationsService } from "@modules/notifications/notifications.service";

import claimAchievements from "./utils/claimAchievements";

interface GameChallengeJWTPayload {
  socketId: string;
  scoreToWin: number;
  username: string;
}

@Injectable()
export class EventsService {
  private playersQueue: Map<number, PlayerEntity[]> = new Map();
  private playersQueueMutex = new Mutex();
  private challengesSet: Set<string> = new Set();
  private challengesSetMutex = new Mutex();

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
    private readonly notificationsSerivces: NotificationsService,
  ) {}

  async userConnected(client: Socket) {
    const payload = this.verifyAuthJWT(client.request);

    if (!payload) {
      return client.disconnect();
    }

    client.data.userId = payload.sub;

    const redisKey = `user-${payload.sub}`;

    const socketsIdsString = await this.redisService.get(redisKey);

    const userSocketsIds: string[] = socketsIdsString
      ? JSON.parse(socketsIdsString)
      : [];

    userSocketsIds.push(client.id);

    await this.redisService.set(redisKey, JSON.stringify(userSocketsIds), {
      EX: 60 * 60 * 24,
    });

    if (userSocketsIds.length == 1) {
      this.usersService.updateStatusById(payload.sub, "ONLINE").catch(() => {
        console.log("couldn't update user status");
      });
    }

    const channels = await this.usersService.findChannelsIds(payload.sub);

    channels.forEach((channel) => {
      const channeRoomName = `chat-channel-${channel.channelId}`;
      client.join(channeRoomName);
    });

    this.broadcastStatusChanged(client, payload.sub, "ONLINE");
  }

  async userDisonnected(client: Socket) {
    const payload = this.verifyAuthJWT(client.request);

    if ("challengeToken" in client.data) {
      this.cancelChallenge(client.data.challengeToken);
    }

    if (!payload) {
      throw new WsException("Unauthorized");
    }

    const redisKey = `user-${payload.sub}`;

    const socketsIdsString = await this.redisService.get(redisKey);

    const userSocketsIds: string[] = socketsIdsString
      ? JSON.parse(socketsIdsString)
      : [];

    if (userSocketsIds.length == 1) {
      this.broadcastStatusChanged(client, payload.sub, "OFFLINE");

      this.redisService.del(redisKey).catch((e) => {
        console.error("can't remove key from redis", e);
      });

      this.usersService.updateStatusById(payload.sub, "OFFLINE").catch((e) => {
        console.error("can't update user status", e);
      });
    }
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

    const isBlocked = await this.usersService.isUsersBlocked(
      user.id,
      receiver.id,
    );

    if (isBlocked) {
      throw new WsException("blocked user");
    }

    const message = await this.messagesService.create(
      user.id,
      receiver.id,
      createMessageDto.text,
    );

    const socketsIdsString = await this.redisService.get(`user-${receiver.id}`);

    this.notificationsSerivces
      .createMessageNotification(receiver.id, {
        type: "message",
        sender: user.username,
      })
      .catch((e) => {
        console.error("cannot create message notification", e);
      });

    if (socketsIdsString) {
      const socketIds: string[] = JSON.parse(socketsIdsString);

      socketIds.forEach((socketId) => {
        client
          .to(socketId)
          .emit(
            "message",
            this.messagesService.composeMessageSocketPayload(message, user),
          );
      });
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

      if (now < channelMember.mutedUntil) {
        throw new WsException("member is muted");
      }
    }

    await this.channelsService.createChannelMessage(
      channelMember.id,
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

      if (this.isInPlayersQueue(user.id)) {
        throw new WsException("cannot join queue twice");
      }

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
        const player = await this.pickPlayerFromQueue(scoreToWin, user.id);

        if (!player) {
          throw new Error("no player to play");
        }

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

        this.registerGameEvents(game, player, opponent, serverSocket);
      }
    } catch (error) {
      console.error(error.message);
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

  async handleChallengePlayer(
    client: Socket,
    user: UserEntity,
    challengePlayerDto: ChallengePlayerDto,
  ) {
    const player = await this.usersService.findOneByUsername(
      challengePlayerDto.username,
    );

    if (!user) {
      throw new WsException("username not found");
    }

    if (player.status != "ONLINE") {
      throw new WsException("player is not online or in game");
    }

    const socketsIdsString = await this.redisService.get(`user-${player.id}`);

    if (!socketsIdsString) {
      throw new WsException("player is not online");
    }

    const socketsIds: string[] = JSON.parse(socketsIdsString);

    const token = this.signGameChallengeJWT({
      socketId: client.id,
      scoreToWin: challengePlayerDto.scoreToWin,
      username: user.username,
    });

    try {
      await this.challengesSetMutex.waitForUnlock();
      await this.challengesSetMutex.acquire();

      this.challengesSet.add(token);

      socketsIds.forEach((socketId) => {
        client.to(socketId).emit("game-challenge", {
          token,
        });
      });
    } finally {
      this.challengesSetMutex.release();
    }

    client.data.challengeToken = token;

    return { token };
  }

  async acceptChallenge(
    client: Socket,
    user: UserEntity,
    socketId: string,
    username: string,
    scoreToWin: number,
    serverSocket: Server,
    token: string,
  ) {
    try {
      await this.challengesSetMutex.waitForUnlock();
      await this.challengesSetMutex.acquire();

      if (!this.challengesSet.has(token)) {
        this.challengesSetMutex.release();
        return;
      }

      this.challengesSet.delete(token);
    } finally {
      this.challengesSetMutex.release();
    }

    const opponentUser = await this.usersService.findOneByUsername(username);

    if (!opponentUser) {
      throw new WsException("username not found");
    }

    if (opponentUser.status != "ONLINE") {
      throw new WsException("player is not online or in game");
    }

    const opponentSocketClient = serverSocket.sockets.sockets.get(socketId);

    if (!opponentSocketClient) {
      throw new WsException("player is not online");
    }

    const player: PlayerEntity = {
      id: user.id,
      rating: user.rating,
      avatar: user.avatarPath,
      username: user.username,
      ranking: await this.usersService.getUserRanking(user.id),
      socketId: client.id,
    };

    const opponent: PlayerEntity = {
      id: opponentUser.id,
      rating: opponentUser.rating,
      avatar: opponentUser.avatarPath,
      username: opponentUser.username,
      ranking: await this.usersService.getUserRanking(opponentUser.id),
      socketId: opponentSocketClient.id,
    };

    const game = this.gameLoopService.createGame(player, opponent, scoreToWin);

    client.data.gameId = game.getSocketRoomName();
    opponentSocketClient.data.gameId = game.getSocketRoomName();

    client.join(game.getSocketRoomName());
    opponentSocketClient.join(game.getSocketRoomName());

    this.registerGameEvents(game, player, opponent, serverSocket);
    this.broadcastStatusChanged(client, player.id, "IN_GAME");
  }

  async cancelChallenge(token: string) {
    try {
      await this.challengesSetMutex.waitForUnlock();
      await this.challengesSetMutex.acquire();

      this.challengesSet.delete(token);
    } finally {
      this.challengesSetMutex.release();
    }
  }

  registerGameEvents(
    game: Game,
    player: PlayerEntity,
    opponent: PlayerEntity,
    serverSocket: Server,
  ) {
    game.events.on("game-started", (data: any) => {
      this.usersService.updateStatusById(player.id, "IN_GAME").catch(() => {
        // can't update status
      });

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

      this.usersService.updateStatusById(player.id, "ONLINE").catch(() => {
        // can't update status
      });

      this.usersService.updateStatusById(opponent.id, "ONLINE").catch(() => {
        // can't update status
      });

      this.claimAchievements(game, winner, data.winnerId).catch(() => {
        console.error("can't claim achievements");
      });

      this.gameLoopService.removeGame(game.getId());
      serverSocket.to(game.getSocketRoomName()).emit("game-over", data);
    });
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

  async leaveQueue(client: Socket) {
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
    } finally {
      this.playersQueueMutex.release();
    }
  }

  private verifyAuthJWT(request: any): AuthJWTPayload | undefined {
    const jwtToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (jwtToken) {
      try {
        const payload = this.jwtService.verify<AuthJWTPayload>(jwtToken, {
          secret: this.configService.get<JWTEnv>("jwt").authSecret,
        });
        return payload;
      } catch {
        return undefined;
      }
    }
  }

  verifyGameChallengeJWT(jwtToken: string): GameChallengeJWTPayload {
    const payload = this.jwtService.verify<GameChallengeJWTPayload>(jwtToken, {
      secret: this.configService.get<JWTEnv>("jwt").gameChallengeSecret,
    });

    return payload;
  }

  signGameChallengeJWT(payload: GameChallengeJWTPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<JWTEnv>("jwt").gameChallengeSecret,
    });
  }

  isInPlayersQueue(userId: number) {
    for (const [, queue] of this.playersQueue) {
      const player = queue.find((p) => p.id == userId);

      if (player) {
        return true;
      }
    }

    return false;
  }

  async pickPlayerFromQueue(scoreToWin: number, userId: number) {
    const playersQueue = this.playersQueue.get(scoreToWin);

    if (!playersQueue) {
      return null;
    }

    const blockList = await this.usersService.findUserBlockListById(userId);

    const playerIndex = playersQueue.findIndex(
      (p) => !blockList.includes(p.id),
    );

    if (playerIndex == -1) {
      return null;
    }

    const player = playersQueue.at(playerIndex);

    playersQueue.splice(playerIndex, 1);

    return player;
  }

  broadcastStatusChanged(client: Socket, userId: number, status: UserStatus) {
    client.broadcast.emit("user-status-changed", {
      userId: userId,
      status: status,
    });
  }
}
