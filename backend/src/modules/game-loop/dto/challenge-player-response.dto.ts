import { IsEnum, IsJWT, IsString } from "class-validator";

export class ChallengePlayerResponseDto {
  @IsString()
  @IsJWT()
  token: string;

  @IsEnum(["accept", "decline"])
  action: "accept" | "decline";
}
