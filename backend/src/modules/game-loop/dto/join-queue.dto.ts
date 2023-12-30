import { IsInt } from "class-validator";

export class JoinQueueDto {
  @IsInt()
  scoreToWin: number;
}
