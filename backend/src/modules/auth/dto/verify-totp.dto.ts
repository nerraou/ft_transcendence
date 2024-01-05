import { IsString } from "class-validator";

export class VerifyTOTPDto {
  @IsString()
  secret: string;

  @IsString()
  token: string;
}
