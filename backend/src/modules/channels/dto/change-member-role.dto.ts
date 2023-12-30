import { ChannelMemberRole } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsPositive } from "class-validator";

export class ChangeMemberRoleDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  channelId: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  memberId: number;

  @IsEnum(ChannelMemberRole)
  role: ChannelMemberRole;
}
