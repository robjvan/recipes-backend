import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipesService } from './recipes.service';
import { AuthGuard } from '@nestjs/passport';
import { Recipe } from '../../common/entities/recipe.entity';
import { User } from '../../common/entities/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('api/v1/recipes')
@UseGuards(AuthGuard())
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  fetchAll(@GetUser() user: User) {
    return this.recipesService.findAllUserRecipes(user.id);
  }

  @Get('/:id')
  fetchOneRecipe(@Param('id') id: number) {
    return this.recipesService.findOneById(id);
  }

  @Post()
  createNewRecipe(
    @GetUser() user: User,
    @Body() recipe: CreateRecipeDto,
  ): Promise<Recipe> {
    return this.recipesService.create(recipe, user.id);
  }

  @Delete('/:id')
  deleteRecipeById(@Param('id') id: number) {
    return this.recipesService.deleteRecipeById(id);
  }

  @Patch('/:id')
  updateRecipeById(@Param('id') id: number, @Body() attrs: Partial<Recipe>) {
    return this.recipesService.updateRecipeById(id, attrs);
  }
}
