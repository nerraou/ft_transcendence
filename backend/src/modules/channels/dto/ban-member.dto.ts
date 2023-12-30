import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class BanMemberDto {
  @IsInt()
  @Type(() => Number)
  channelId: number;

  @IsInt()
  @Type(() => Number)
  memberId: number;
}
