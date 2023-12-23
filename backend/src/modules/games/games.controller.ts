import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";

import { GetGamesApiDocumentation } from "./decorators/docs.decorator";
import { GetGamesdDto } from "./dto/get-games.dto";
import { GamesService } from "./games.service";

@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get("/users/:username/games")
  @GetGamesApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getGames(
    @Param("username") username: string,
    @Query() getGamesDto: GetGamesdDto,
  ) {
    const count = await this.gamesService.findGamesCount(username, getGamesDto);
    const games = await this.gamesService.findGames(username, getGamesDto);

    return {
      count,
      games,
    };
  }
}
