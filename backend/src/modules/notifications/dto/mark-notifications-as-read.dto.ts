import { IsArray, IsInt, IsPositive } from "class-validator";

export class MarkNotificationsAsReadDto {
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  ids: number[];
}
