import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";

export class SearchUsersDto {
  @Expose({ name: "search_query" })
  @IsString()
  @Length(1, 255)
  searchQuery: string;
}
