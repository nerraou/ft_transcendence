import { IsInt, IsPositive, Max } from "class-validator";

export class CreateContactDto {
  @IsInt()
  @IsPositive()
  @Max(2147483627)
  userId: number;
}
