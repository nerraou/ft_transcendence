import { IsString, Length } from "class-validator";

export class CreateMessageDto {
  @IsString()
  @Length(1, 255)
  username: string;

  @IsString()
  @Length(1, 1024)
  text: string;
}
