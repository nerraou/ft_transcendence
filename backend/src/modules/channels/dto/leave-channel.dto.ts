import { IsInt, Min } from "class-validator";

export class LeaveChannelDto {
  @IsInt()
  @Min(1)
  channelId: number;
}
