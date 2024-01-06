import { Type } from "class-transformer";
import { IsInt, IsPositive, IsString, Length, Max } from "class-validator";

export class InviteUserDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  @Max(2147483627)
  channelId: number;

  @IsString()
  @Length(1, 32)
  username: string;
}
