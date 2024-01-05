import { IsString, IsUUID } from "class-validator";

export class VerifyTOTPOAuthDto {
  @IsUUID("4")
  key: string;

  @IsString()
  token: string;
}
