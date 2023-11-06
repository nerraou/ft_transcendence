import { Transform } from "class-transformer";
import { IsEmail, IsStrongPassword } from "class-validator";

export class SignUpDto {
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @IsStrongPassword()
  password: string;
}
