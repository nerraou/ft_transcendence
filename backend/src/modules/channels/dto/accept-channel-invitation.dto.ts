import { IsJWT } from "class-validator";

export class AcceptChannelInvitationDto {
  @IsJWT()
  token: string;
}
