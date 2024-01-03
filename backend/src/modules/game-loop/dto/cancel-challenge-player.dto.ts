import { IsJWT } from "class-validator";

export class CancelChallengePlayerDto {
  @IsJWT()
  token: string;
}
