import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicIngredient } from 'src/common/entities/basic-ingredient.entity';
import { InstructionStep } from 'src/common/entities/instruction-step.entity';
import { RecipeIngredient } from 'src/common/entities/recipe-ingredient.entity';
import { Recipe } from '../../common/entities/recipe.entity';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, InstructionStep, RecipeIngredient, BasicIngredient]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [RecipesController],
  exports: [],
  providers: [RecipesService],
})
export class RecipesModule {}
