import { ChannelMemberRole } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsPositive, Max } from "class-validator";

export class ChangeMemberRoleDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  @Max(2147483627)
  channelId: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  @Max(2147483627)
  memberId: number;

  @IsEnum(ChannelMemberRole)
  role: ChannelMemberRole;
}
