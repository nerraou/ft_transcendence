import { IsInt, IsPositive, Max } from "class-validator";

export class LeaveChannelDto {
  @IsInt()
  @IsPositive()
  @Max(2147483627)
  channelId: number;
}
