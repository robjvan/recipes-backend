import { IsString } from "class-validator";

export class CheckUsernameDto {
  @IsString()
  username: string;
}