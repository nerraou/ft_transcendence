import { IsEnum, IsJWT } from "class-validator";

export class ChallengePlayerResponseDto {
  @IsJWT()
  token: string;

  @IsEnum(["accept", "decline"])
  action: "accept" | "decline";
}
