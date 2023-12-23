import { PrismaService } from "@common/modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateGametDto } from "./dto/create-game.dto";
import { UsersService } from "@modules/users/users.service";

@Injectable()
export class GamesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async createGame(createGametDto: CreateGametDto) {
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

    this.prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        data: {
          rating: playerNewRating,
        },
        where: {
          id: player.id,
        },
      });

      await prisma.user.update({
        data: {
          rating: opponentNewRating,
        },
        where: {
          id: opponent.id,
        },
      });

      const playerNewRanking = await this.usersService.getUserRanking(
        player.id,
      );
      const opponentNewRanking = await this.usersService.getUserRanking(
        opponent.id,
      );

      return prisma.game.create({
        data: {
          duration: Date.now() - startedAt,

          playerId: player.id,
          playerOldRating: player.rating,
          playerNewRating: playerNewRating,
          playerScore: player.score,
          playerOldRanking: player.ranking,
          playerNewRanking,

          opponentId: opponent.id,
          opponentOldRating: opponent.rating,
          opponentNewRating: opponentNewRating,
          opponentScore: opponent.score,
          opponentOldRanking: opponent.ranking,
          opponentNewRanking,

          winner: winner,
        },
      });
    });
  }
}
