import { Expose, Type } from "class-transformer";
import { IsInt, IsPositive, IsString, Length, Max } from "class-validator";

export class SearchChannelsUsersDto {
  @Expose({ name: "channel_id" })
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  @Max(2147483627)
  channelId: number;

  @Expose({ name: "search_query" })
  @IsString()
  @Length(1, 255)
  searchQuery: string;
}
