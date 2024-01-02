import { Expose, Type } from "class-transformer";
import { IsInt, IsString, Length } from "class-validator";

export class SearchUsersDto {
  @Expose({ name: "channel_id" })
  @IsInt()
  @Type(() => Number)
  channelId: number;

  @Expose({ name: "search_query" })
  @IsString()
  @Length(1, 255)
  searchQuery: string;
}
