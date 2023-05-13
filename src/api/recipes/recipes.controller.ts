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
import { AuthGuard } from '@nestjs/passport';
import { RecipesService } from './recipes.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/common/entities/user.entity';
import { CreateRecipeDto } from 'src/common/entities/dto/create-recipe.dto';
import { UpdateRecipeDto } from 'src/common/entities/dto/update-recipe.dto';
import { GenerateRecipeDto } from 'src/common/entities/dto/generate_recipe.dto';

@Controller('api/v1/recipes')
@UseGuards(AuthGuard('jwt'))
export class RecipesController {
  constructor(private recipeService: RecipesService) {}

  /// C - Save new recipe to DB
  @Post('')
  saveNewRecipe(@Body() recipe: CreateRecipeDto) {
    return this.recipeService.createRecipe(recipe);
  }

  /// R - Fetch all recipes for user
  @Get()
  fetchAllRecipes(@GetUser() user: User) {
    return this.recipeService.findAll(user.id);
  }

  /// R - Fetch details of one recipe
  @Get('/:id')
  fetchOneRecipeById(@Param('id') id: number) {
    return this.recipeService.findOneById(id);
  }

  /// U - Update recipe by ID
  @Patch('/:id')
  updateRecipeById(@Param('id') id: number, @Body() newData: UpdateRecipeDto) {
    return this.recipeService.updateOneById(id, newData);
  }

  /// D - Delete recipe by ID
  @Delete('/:id')
  deleteRecipeById(@Param('id') id: number) {
    return this.recipeService.deleteOneById(id);
  }

  @Post('/generate')
  generateRecipe(@Body() request: GenerateRecipeDto, @GetUser() user: User) {
    return this.recipeService.generateRecipe(request, user);
  }
}
