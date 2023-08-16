import { IsEmail, IsStrongPassword } from "class-validator";

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
