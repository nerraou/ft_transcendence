import { Type } from "class-transformer";
import { IsInt, IsPositive, Max } from "class-validator";

export class KickMemberDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  @Max(2147483627)
  channelId: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  @Max(2147483627)
  memberId: number;
}
