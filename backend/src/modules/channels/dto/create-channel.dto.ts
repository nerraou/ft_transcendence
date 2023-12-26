import { RequireIf } from "@common/decorators/RequireIf";
import { ChannelType } from "@prisma/client";
import { IsEnum, IsString, Length, ValidateIf } from "class-validator";

export class CreateChannelDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(10, 500)
  description: string;

  @IsEnum(ChannelType)
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
