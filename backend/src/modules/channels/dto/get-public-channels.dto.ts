import { Expose } from "class-transformer";
import { IsOptional, IsString, Length } from "class-validator";

export class GetPublicChannelsDto {
  @Expose({ name: "search_query" })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  searchQuery?: string;
}
