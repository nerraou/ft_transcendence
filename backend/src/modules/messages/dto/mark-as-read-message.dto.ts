import { IsArray, IsNumber } from "class-validator";

export class MarkAsReadMessageDto {
  @IsArray()
  @IsNumber({}, { each: true })
  messagesIds: number[];
}
