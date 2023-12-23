import { GameWinner } from "@prisma/client";

export class CreateGametDto {
  startedAt: number;
  winner: GameWinner;
  player: {
    id: number;
    score: number;
    rating: number;
    ranking: number;
  };
  opponent: {
    id: number;
    score: number;
    rating: number;
    ranking: number;
  };
}
