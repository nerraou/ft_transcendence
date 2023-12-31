import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class BanMemberDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  channelId: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  memberId: number;
}
