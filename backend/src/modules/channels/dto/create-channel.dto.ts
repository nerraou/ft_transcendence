import { RequireIf } from "@common/decorators/RequireIf";
import { ChannelType } from "@prisma/client";
import { IsEnum, IsString, Length } from "class-validator";

export class CreateChannelDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(10, 500)
  description: string;

  @IsEnum(ChannelType)
  type: ChannelType;

  @IsString()
  @RequireIf((object) => {
    return object.type == "PROTECTED";
  })
  password?: string;
}
