import { IsEmail, IsStrongPassword } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateEmailDto {
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @IsStrongPassword()
  password: string;
}
