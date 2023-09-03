import { IsInt, IsPositive } from "class-validator";

export class CreateContactDto {
  @IsInt()
  @IsPositive()
  userId: number;
}
