import { Expose, Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class GetUserDto {
  @Expose({
    name: "include_stats",
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value == "true")
  includeStats?: boolean;
}
