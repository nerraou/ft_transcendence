import { ChannelType } from "@prisma/client";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  ValidateIf,
} from "class-validator";
import { Type } from "class-transformer";

import { RequireIf } from "@common/decorators/RequireIf";

export class UpdateChannelDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  @Max(2147483627)
  channelId: number;

  @IsString()
  @Length(1, 255)
  @IsOptional()
  name: string;

  @IsString()
  @Length(10, 500)
  @IsOptional()
  description: string;

  @IsEnum(ChannelType)
  @IsOptional()
  type: ChannelType;

  @ValidateIf((object) => object.type == "PROTECTED")
  @IsString()
  @Length(4, 16)
  @RequireIf((object) => {
    if (object.type == "PROTECTED") {
      return typeof object.password != "string";
    }

    return false;
  })
  password?: string;
}
