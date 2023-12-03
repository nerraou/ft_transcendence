import { IsEmail, IsUUID } from "class-validator";

export default class ConfirmEmailTokenDto {
  @IsEmail()
  email: string;

  @IsUUID(4)
  token: string;
}
