import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @IsNumber()
  @IsOptional()
  servings: number;

  @IsNumber()
  @IsOptional()
  cookTime: number;

  @IsNumber()
  @IsOptional()
  prepTime: number;

  @IsString()
  @IsOptional()
  description: string;

  //* Allergen Fields
  @IsBoolean()
  @IsOptional()
  containsWheat = false;

  @IsBoolean()
  @IsOptional()
  containsSoy = false;

  @IsBoolean()
  @IsOptional()
  containsPeanuts = false;

  @IsBoolean()
  @IsOptional()
  containsTreeNuts = false;

  @IsBoolean()
  @IsOptional()
  containsDairy = false;

  @IsBoolean()
  @IsOptional()
  containsEggs = false;

  @IsBoolean()
  @IsOptional()
  containsSeafood = false;
}