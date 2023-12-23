import * as EventEmitter from "events";

import { Ball } from "./Ball";
import Vector from "./Vector";
import Player from "./Player";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./constants";

import { GameStatus, PaddleSide, PlayerEntity } from "../types";

interface GameConstructorArgs {
  id: string;
  player: PlayerEntity;
  opponent: PlayerEntity;
  scoreToWin: number;
  ballSpeed: number;
  paddleSpeed: number;
  socketRoomName: string;
}

export default class Game {
  private id: string;
  public ball: Ball;
  private ballDirection = new Vector(1, 1);
  private status: GameStatus = "idle";
  private ballSpeed: number;
  private paddleSpeed: number;
  private scoreToWin: number;
  private socketRoomName: string;
  public startedAt: number;

  public player: Player;
  public opponent: Player;

  public events: EventEmitter;

  constructor(args: GameConstructorArgs) {
    this.id = args.id;
    this.ballSpeed = args.ballSpeed;
    this.paddleSpeed = args.paddleSpeed;
    this.socketRoomName = args.socketRoomName;
    this.scoreToWin = args.scoreToWin;
    this.startedAt = Date.now();
    this.events = new EventEmitter();

    this.initBall();

    this.initPlayers(args.player, args.opponent);
  }

  update() {
    this.startGame();
    this.bounceBall();
  }

  getId() {
    return this.id;
  }

  getSocketRoomName() {
    return this.socketRoomName;
  }

  private startGame() {
    if (this.status == "idle") {
      this.status = "started";

      this.events.emit("game-started", {
        gameId: this.id,
        ballSpeed: this.ballSpeed,
        paddleSpeed: this.paddleSpeed,
        ballPosition: this.ball.position.toJSON(),
        ballDirection: this.ballDirection,
        opponentId: this.opponent.id,
        player: this.player,
        opponent: this.opponent,
      });
    }
  }

  private resetBall(outSide: PaddleSide) {
    this.ball.position = new Vector(BOARD_WIDTH / 2, BOARD_HEIGHT / 2);
    this.ballDirection.y = 1;

    if (outSide == "left") {
      this.ballDirection.x = 1;
    } else {
      this.ballDirection.x = -1;
    }
  }

  private onBallOut(outSide: PaddleSide) {
    let winnerId: number | undefined;

    if (outSide == "left") {
      this.opponent.score++;
    } else {
      this.player.score++;
    }

    if (this.opponent.score == this.scoreToWin) {
      winnerId = this.opponent.id;
    } else if (this.player.score == this.scoreToWin) {
      winnerId = this.player.id;
    }

    this.events.emit("ball-out", {
      scoreFor: outSide == "left" ? "opponent" : "player",
    });

    if (winnerId) {
      this.events.emit("game-over", { winnerId });
      return;
    }
  }

  private bounceBall() {
    let newXDirection: -1 | 1 | undefined;
    let newYDirection: -1 | 1 | undefined;
    let outSide: PaddleSide | undefined;

    if (this.ball.position.x <= 0) {
      outSide = "left";
    } else if (this.ball.position.x >= BOARD_WIDTH) {
      outSide = "right";
    }

    if (outSide) {
      this.resetBall(outSide);

      return this.onBallOut(outSide);
    }

    if (this.isLeftPaddleTouch()) {
      newXDirection = 1;

      this.ball.position.x =
        this.player.paddle.position.x +
        this.player.paddle.width +
        this.ball.radius +
        1;
    } else if (this.isRightPaddleTouch()) {
      newXDirection = -1;

      this.ball.position.x =
        this.opponent.paddle.position.x - this.ball.radius - 1;
    }

    if (newXDirection) {
      this.ball.position.x += newXDirection * this.ballSpeed;
      this.ballDirection.x = newXDirection;
    } else {
      this.ball.position.x += this.ballDirection.x * this.ballSpeed;
    }

    if (this.ball.position.y <= 0) {
      newYDirection = 1;
    } else if (this.ball.position.y >= BOARD_HEIGHT) {
      newYDirection = -1;
    }

    if (newYDirection) {
      this.ball.position.y += newYDirection * this.ballSpeed;
      this.ballDirection.y = newYDirection;
    } else {
      this.ball.position.y += this.ballDirection.y * this.ballSpeed;
    }

    this.events.emit("ball-moved", this.ball.position.toJSON());
  }

  private isLeftPaddleTouch() {
    if (this.ball.position.y < this.player.paddle.position.y) {
      return false;
    }

    if (
      this.ball.position.y >
      this.player.paddle.position.y + this.player.paddle.height
    ) {
      return false;
    }

    if (
      this.ball.position.x >
      this.player.paddle.position.x + this.player.paddle.width
    ) {
      return false;
    }

    return true;
  }

  private isRightPaddleTouch() {
    if (this.ball.position.y < this.opponent.paddle.position.y) {
      return false;
    }

    if (
      this.ball.position.y >
      this.opponent.paddle.position.y + this.opponent.paddle.height
    ) {
      return false;
    }

    if (this.ball.position.x < this.opponent.paddle.position.x) {
      return false;
    }

    return true;
  }

  private initBall() {
    this.ball = new Ball(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, 20);
  }

  private initPlayers(player: PlayerEntity, opponent: PlayerEntity) {
    this.player = new Player(
      "left",
      player.id,
      player.rating,
      player.avatar,
      player.username,
      player.ranking,
      player.socketId,
    );

    this.opponent = new Player(
      "right",
      opponent.id,
      opponent.rating,
      opponent.avatar,
      opponent.username,
      player.ranking,
      opponent.socketId,
    );
  }
}
