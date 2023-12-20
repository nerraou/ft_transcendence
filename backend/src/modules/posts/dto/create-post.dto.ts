import { IsOptional, IsString, Length } from "class-validator";

export class CreatePostDto {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  content?: string;
}
