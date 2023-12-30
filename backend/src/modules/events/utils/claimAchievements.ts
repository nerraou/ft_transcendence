import { Achievement } from "@modules/achievements/achievements.service";
import Player from "@modules/game-loop/classes/Player";
import { UsersService } from "@modules/users/users.service";

interface IAchievementRequirement {
  claim: (
    player: Player,
    opponent: Player,
    winnerId: number,
    services: { users: UsersService },
  ) => Promise<Achievement | undefined>;
}

const achievementsRequirements: IAchievementRequirement[] = [
  {
    async claim(player, opponent, winnerId) {
      if (player.id == winnerId && opponent.score == 0) {
        return {
          userId: player.id,
          name: "CleanSheet",
        };
      }
    },
  },
  {
    async claim(player, opponent, winnerId, services) {
      if (player.id == winnerId) {
        const winsCount = await services.users.getWinsCount(player.id);

        if (winsCount >= 100) {
          return {
            userId: player.id,
            name: "OneHundredWins",
          };
        } else if (winsCount >= 50) {
          return {
            userId: player.id,
            name: "FiftyWins",
          };
        } else if (winsCount >= 5) {
          return {
            userId: player.id,
            name: "FiveWins",
          };
        } else {
          return {
            userId: player.id,
            name: "FirstWin",
          };
        }
      }
    },
  },
  {
    async claim(player, opponent, winnerId, services) {
      const ranking = await services.users.getUserRanking(player.id);

      if (ranking == 1) {
        return {
          userId: player.id,
          name: "FirstRanked",
        };
      } else if (ranking >= 2) {
        return {
          userId: player.id,
          name: "SecondRanked",
        };
      } else if (ranking >= 3) {
        return {
          userId: player.id,
          name: "ThirdRanked",
        };
      } else {
        const lastRankedPlayer = await services.users.findLastRankedPlayer();

        if (lastRankedPlayer?.id == player.id) {
          return {
            userId: player.id,
            name: "LastRanked",
          };
        }
      }
    },
  },
];

export default async function claimAchievements(
  player: Player,
  opponent: Player,
  usersService: UsersService,
  winnerId: number,
) {
  const achievements: Achievement[] = [];

  for (let i = 0; i < achievementsRequirements.length; i++) {
    const achievement = await achievementsRequirements[i].claim(
      player,
      opponent,
      winnerId,
      {
        users: usersService,
      },
    );

    if (achievement) {
      achievements.push(achievement);
    }
  }

  return achievements;
}
