import { Type } from "class-transformer";
import { IsInt, IsString, Length } from "class-validator";

export class CreateChannelMessageDto {
  @IsInt()
  @Type(() => Number)
  channelId: number;

  @IsString()
  @Length(1, 500)
  message: string;
}
