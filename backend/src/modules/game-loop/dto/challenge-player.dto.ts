import { IsInt, IsString, Length } from "class-validator";

export class ChallengePlayerDto {
  @IsString()
  @Length(1, 32)
  username: string;

  @IsInt()
  scoreToWin: number;
}
