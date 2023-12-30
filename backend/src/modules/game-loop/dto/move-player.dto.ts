import { IsInt, IsString } from "class-validator";

export class MovePlayerDto {
  @IsString()
  gameId: string;

  @IsInt()
  y: number;
}
