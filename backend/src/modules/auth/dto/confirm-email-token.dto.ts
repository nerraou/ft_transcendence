import { IsUUID } from "class-validator";

export default class ConfirmEmailTokenDto {
  @IsUUID(4)
  token: string;
}
