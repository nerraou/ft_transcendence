import { PrismaService } from "@common/modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateGametDto } from "./dto/create-game.dto";

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  createGame(createGametDto: CreateGametDto) {
    const { startedAt, winner, player, opponent } = createGametDto;
    let playerNewRating: number;
    let opponentNewRating: number;

    if (winner == "PLAYER") {
      playerNewRating = player.rating + 10;
      opponentNewRating = opponent.rating - 10;
    } else {
      playerNewRating = player.rating - 10;
      opponentNewRating = opponent.rating + 10;
    }

    return this.prisma.$transaction([
      this.prisma.user.update({
        data: {
          rating: playerNewRating,
        },
        where: {
          id: player.id,
        },
      }),
      this.prisma.user.update({
        data: {
          rating: opponentNewRating,
        },
        where: {
          id: opponent.id,
        },
      }),
      this.prisma.game.create({
        data: {
          duration: Date.now() - startedAt,
          playerId: player.id,
          playerOldRating: player.rating,
          playerNewRating: playerNewRating,
          playerScore: player.score,

          opponentId: opponent.id,
          opponentOldRating: opponent.rating,
          opponentNewRating: opponentNewRating,
          opponentScore: opponent.score,

          winner: winner,
        },
      }),
    ]);
  }
}
