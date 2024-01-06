import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
} from "class-validator";

export class JoinChannelDto {
  @IsInt()
  @IsPositive()
  @Max(2147483627)
  channelId: number;

  @IsOptional()
  @IsString()
  @Length(4)
  password?: string;
}
