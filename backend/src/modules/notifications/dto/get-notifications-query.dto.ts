import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class GetNotificationsQueryDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page = 1;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  limit = 10;
}
