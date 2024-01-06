import { Type } from "class-transformer";
import { IsInt, IsString, Length, Max } from "class-validator";

export class CreateChannelMessageDto {
  @IsInt()
  @Type(() => Number)
  @Max(2147483627)
  channelId: number;

  @IsString()
  @Length(1, 500)
  message: string;
}
