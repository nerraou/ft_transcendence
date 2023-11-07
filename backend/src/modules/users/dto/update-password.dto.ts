import { IsStrongPassword } from "class-validator";

export class UpdatePasswordDto {
  @IsStrongPassword()
  currentPassword: string;

  @IsStrongPassword()
  newPassword: string;
}
