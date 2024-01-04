import { Type } from "class-transformer";
import { IsInt, IsPositive, IsString, Length } from "class-validator";

export class InviteUserDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  channelId: number;

  @IsString()
  @Length(1, 32)
  username: string;
}
