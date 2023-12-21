export interface PlayerEntity {
  id: number;
  rating: number;
  socketId: string;
  avatar: string;
  username: string;
}

export type PaddleSide = "left" | "right";

export type PaddleDirection = -1 | 1 | 0;

export type GameStatus = "idle" | "started" | "finished";
