import { Injectable } from "@nestjs/common";
import { v4 as uuid4 } from "uuid";

import Game from "./classes/Game";
import { PlayerEntity } from "./types";
import { BALL_SPEED, PADDLE_SPEED } from "./classes/constants";

@Injectable()
export class GameLoopService {
  private games = new Map<string, Game>();

  constructor() {
    this.start();
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
