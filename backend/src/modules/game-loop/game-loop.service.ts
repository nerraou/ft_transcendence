import { Injectable } from "@nestjs/common";
import { v4 as uuid4 } from "uuid";
// import { Server } from "socket.io";

import Game from "./classes/Game";
import { PlayerEntity } from "./types";
import {
  BALL_SPEED,
  // BOARD_HEIGHT,
  // BOARD_WIDTH,
  PADDLE_SPEED,
} from "./classes/constants";

@Injectable()
export class GameLoopService {
  private games = new Map<string, Game>();

  constructor() {
    this.start();
    // setInterval(() => {
    //   this.games.forEach((game) => {
    //     game.events.emit("game-debug", {
    //       paddleWidth: game.player.paddle.width,
    //       paddleHeight: game.player.paddle.height,
    //       leftPaddle: game.player.paddle.position.toJSON(),
    //       rightPaddle: game.opponent.paddle.position.toJSON(),
    //       boardWidth: BOARD_WIDTH,
    //       boardHeight: BOARD_HEIGHT,
    //       ballX: game.ball.position.x,
    //       ballY: game.ball.position.y,
    //       ballRadius: game.ball.radius,
    //     });
    //   });
    // }, 1000 / 60);
    // process.nextTick();
  }

  loop() {
    this.games.forEach((game) => {
      try {
        game.update();
      } catch (error) {
        console.log(error);
      }
    });
  }

  start() {
    setInterval(() => {
      this.loop();
    }, 1000 / 60);
  }

  createGame(player: PlayerEntity, opponent: PlayerEntity, scoreToWin: number) {
    const id = `game-${uuid4()}`;

    const game = new Game({
      id,
      player,
      opponent,
      ballSpeed: BALL_SPEED,
      paddleSpeed: PADDLE_SPEED,
      socketRoomName: id,
      scoreToWin: scoreToWin,
    });

    this.games.set(id, game);

    return game;
  }

  removeGame(id: string) {
    this.games.delete(id);
  }

  getGameById(id: string) {
    return this.games.get(id);
  }
}
