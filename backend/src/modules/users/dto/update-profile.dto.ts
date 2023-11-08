import { IsOptional, IsString, Length } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @Length(3, 32)
  @Transform(({ value }) => value?.toLowerCase())
  username?: string;

  @IsString()
  @IsOptional()
  @Length(3, 64)
  firstName?: string;

  @IsString()
  @IsOptional()
  @Length(3, 64)
  lastName?: string;
}
