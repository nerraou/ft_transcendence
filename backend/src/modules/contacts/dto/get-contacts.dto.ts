import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class GetContactsDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  page = 1;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  limit: number;
}
