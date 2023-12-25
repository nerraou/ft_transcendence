import { IsInt, IsOptional, IsString, Length, Min } from "class-validator";

export class JoinChannelDto {
  @IsInt()
  @Min(1)
  channelId: number;

  @IsOptional()
  @IsString()
  @Length(8)
  password?: string;
}
