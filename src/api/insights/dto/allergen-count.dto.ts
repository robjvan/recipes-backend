import { IsNumber, Min } from "class-validator";

export class AllergenCountDto {
  @IsNumber()
  @Min(0, {message: 'Count cannot be less than 0'})
  eggs: number;

  @IsNumber()
  @Min(0, {message: 'Count cannot be less than 0'})
  wheat: number;
  
  @IsNumber()
  @Min(0, {message: 'Count cannot be less than 0'})
  soy: number;
  
  @IsNumber()
  @Min(0, {message: 'Count cannot be less than 0'})
  seafood: number;
  
  @IsNumber()
  @Min(0, {message: 'Count cannot be less than 0'})
  peanuts: number;
  
  @IsNumber()
  @Min(0, {message: 'Count cannot be less than 0'})
  treeNuts: number;
  
  @IsNumber()
  @Min(0, {message: 'Count cannot be less than 0'})
  dairy: number;
}