import { IsDateGreaterThan } from "@common/decorators/IsDateGreaterThan";
import { Require } from "@common/decorators/Require";
import { Expose, Type } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from "class-validator";

export enum SortOrderEnum {
  ASC = "asc",
  DESC = "desc",
}

export enum SortFieldEnum {
  DURATION = "duration",
  DATE = "date",
}

export class GetGamesdDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  page: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  limit: number;

  @Expose({ name: "search_query" })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  searchQuery?: string;

  @Expose({ name: "start_date" })
  @Require("endDate")
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @Expose({ name: "end_date" })
  @IsDateGreaterThan("startDate")
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @Expose({ name: "sort_order" })
  @IsEnum(SortOrderEnum)
  @IsOptional()
  sortOrder?: SortOrderEnum;

  @Expose({ name: "sort_field" })
  @IsEnum(SortFieldEnum)
  @IsOptional()
  sortField?: SortFieldEnum;
}
