import { IsNumber, IsString } from "class-validator";

export class HttpResponseDto {
  @IsNumber()
  status: number;

  @IsString()
  message: string;
}