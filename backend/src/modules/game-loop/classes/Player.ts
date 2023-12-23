import Paddle from "./Paddle";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_PADDING,
  PADDLE_WIDTH,
} from "./constants";

import { PaddleDirection, PaddleSide } from "../types";

export default class Player {
  public id: number;
  public socketId: string;
  public score = 0;
  public rating: number;
  public avatar: string;
  public username: string;

  public paddle: Paddle;
  public side: PaddleSide;

  private yDirection: PaddleDirection;

  constructor(
    side: PaddleSide,
    id: number,
    rating: number,
    avatar: string,
    username: string,
    socketId: string,
  ) {
    this.initPaddle(side);
    this.id = id;
    this.socketId = socketId;
    this.rating = rating;
    this.avatar = avatar;
    this.username = username;
  }

  moveUp() {
    this.yDirection = -1;
  }

  moveDown() {
    this.yDirection = 1;
  }

  getYDirection() {
    return this.yDirection;
  }

  initPaddle(side: PaddleSide) {
    let x: number;

    this.side = side;

    if (side == "left") {
      x = PADDLE_PADDING;
    } else {
      x = BOARD_WIDTH - PADDLE_PADDING - PADDLE_WIDTH;
    }

    this.paddle = new Paddle(x, BOARD_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT);
  }

  toJSON() {
    return {
      id: this.id,
      rating: this.rating,
      avatar: this.avatar,
      username: this.username,
    };
  }
}
