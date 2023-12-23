import { Injectable } from "@nestjs/common";

import { PrismaService } from "@common/modules/prisma/prisma.service";
import { UsersService } from "@modules/users/users.service";

import { CreateGametDto } from "./dto/create-game.dto";
import { GetGamesdDto, SortFieldEnum } from "./dto/get-games.dto";

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

  async findGames(username: string, getGamesDto: GetGamesdDto) {
    const { searchQuery, filterQuery, sortOptions } =
      this.getFindGamesQueryOptions(getGamesDto);

    const games = await this.prisma.game.findMany({
      where: {
        AND: {
          OR: [
            {
              player: {
                username,
              },
            },
            {
              opponent: {
                username,
              },
            },
          ],
          ...filterQuery,
          ...searchQuery,
        },
      },
      skip: (getGamesDto.page - 1) * getGamesDto.limit,
      take: getGamesDto.limit,
      include: {
        player: true,
        opponent: true,
      },
      orderBy: sortOptions,
    });

    const mappedGames = games.map((game) => {
      const player = {
        id: game.player.id,
        username: game.player.username,
        avatarPath: game.player.avatarPath,
        score: game.playerScore,
        oldRating: game.playerOldRating,
        newRating: game.playerNewRating,
        oldRanking: game.playerOldRanking,
        newRanking: game.playerNewRating,
        isWinner: game.winner == "PLAYER",
      };

      const opponent = {
        id: game.opponent.id,
        username: game.opponent.username,
        avatarPath: game.opponent.avatarPath,
        score: game.opponentScore,
        oldRating: game.opponentOldRating,
        newRating: game.opponentNewRating,
        oldRanking: game.opponentOldRanking,
        newRanking: game.opponentNewRating,
        isWinner: game.winner == "OPPONENT",
      };

      return {
        id: game.id,
        createdAt: game.createdAt,
        duration: game.duration,
        player: player.username == username ? player : opponent,
        opponent: player.username == username ? opponent : player,
      };
    });

    return mappedGames;
  }

  async findGamesCount(username: string, getGamesDto: GetGamesdDto) {
    const { searchQuery, filterQuery, sortOptions } =
      this.getFindGamesQueryOptions(getGamesDto);

    return this.prisma.game.count({
      where: {
        AND: {
          OR: [
            {
              player: {
                username,
              },
            },
            {
              opponent: {
                username,
              },
            },
          ],
          ...filterQuery,
          ...searchQuery,
        },
      },
      orderBy: sortOptions,
    });
  }

  private getFindGamesQueryOptions(getGamesDto: GetGamesdDto) {
    let searchQuery = {};
    let filterQuery = {};
    let sortOptions = {};

    if (getGamesDto.searchQuery) {
      searchQuery = {
        OR: [
          {
            player: {
              username: {
                contains: getGamesDto.searchQuery,
              },
            },
          },
          {
            opponent: {
              username: {
                contains: getGamesDto.searchQuery,
              },
            },
          },
        ],
      };
    }

    if (getGamesDto.startDate && getGamesDto.endDate) {
      filterQuery = {
        createdAt: {
          gte: getGamesDto.startDate,
          lte: getGamesDto.endDate,
        },
      };
    }

    if (getGamesDto.sortField) {
      let field: string = getGamesDto.sortField;
      if (field == SortFieldEnum.DATE) {
        field = "createdAt";
      }

      sortOptions = {
        [field]: getGamesDto.sortOrder || "asc",
      };
    }

    return {
      searchQuery,
      filterQuery,
      sortOptions,
    };
  }
}
