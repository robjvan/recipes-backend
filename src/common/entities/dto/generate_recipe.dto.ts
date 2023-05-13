import { IsNumber, IsString } from 'class-validator';

export class GenerateRecipeDto {
  @IsString()
  input: string;

  @IsNumber()
  servings: string;
}
