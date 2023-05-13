import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  cookTime: number;

  @IsOptional()
  @IsNumber()
  prepTime: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  servings: number;

  // ingredientDto?
  ingredients: Map<string, string>[];

  // instructionDto?
  instructions: Map<string, string>[];

  // TODO: Add missing fields
}
