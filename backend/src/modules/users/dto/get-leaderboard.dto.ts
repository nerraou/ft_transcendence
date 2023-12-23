import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class GetLeaderboardDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  page: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  limit: number;
}
