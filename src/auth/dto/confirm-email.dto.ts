import { IsEmail, IsString } from "class-validator";

export class ConfirmEmailDto {
  @IsEmail()
  username: string;
  
  @IsString()
  token: string;
}