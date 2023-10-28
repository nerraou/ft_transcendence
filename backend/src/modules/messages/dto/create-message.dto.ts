import { IsInt, IsString, Length, Min } from "class-validator";

export class CreateMessageDto {
  @IsInt()
  @Min(1)
  receiverId: number;

  @IsString()
  @Length(1, 1024)
  text: string;
}
