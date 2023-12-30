import { Type } from "class-transformer";
import { IsInt, IsPositive, Max } from "class-validator";

export class MuteMemberDto {
  @IsInt()
  @Type(() => Number)
  channelId: number;

  @IsInt()
  @Type(() => Number)
  memberId: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  @Max(1440) // max 24 hours
  minutes: number;
}
