import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from '../../common/entities/recipe.entity';
import { User } from 'src/common/entities/user.entity';
import { InstructionStep } from 'src/common/entities/instruction-step.entity';
import { RecipeIngredient } from 'src/common/entities/recipe-ingredient.entity';
import { BasicIngredient } from 'src/common/entities/basic-ingredient.entity';

@Injectable()
export class RecipesService {
  private logger: Logger = new Logger(RecipesService.name);

  constructor(
    @InjectRepository(Recipe)
    private readonly recipesRepo: Repository<Recipe>,
    @InjectRepository(InstructionStep)
    private readonly instructionsRepo: Repository<InstructionStep>,
    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientsRepo: Repository<RecipeIngredient>,
    @InjectRepository(BasicIngredient)
    private readonly basicIngredientsRepo: Repository<BasicIngredient>,
  ) {}

  /** Create and save a new recipe to the DB
   *
   * @param title Title of new recipe
   * @returns Newly created Recipe{} object
   */
  async create(recipe: CreateRecipeDto, userId: number): Promise<Recipe> {
    // TODO: Add logic to check if recipe already exists
    // TODO: Add try/catch blocks and error checking
    // TODO: Catch and save "instruction steps" to table
    // TODO: Catch and save "ingredients" to table
    const newRecipe = this.recipesRepo.create({
      title: recipe.title,
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      description: recipe.description,
      servings: recipe.servings,
      userId: userId,
    });

    const result = this.recipesRepo.save(newRecipe);
    return result;
  }

  /** Fetch one recipe by ID
   *
   * @param id ID of recipe record to find
   * @returns Recipe object
   * @throws NotFoundException is no record exists with given ID
   */
  async findOneById(id: number): Promise<Recipe> {
    let result: Recipe;
    try {
      result = await this.recipesRepo.findOne({ where: { userId: id } });
    } catch (err) {
      Logger.error('Could not fetch recipe record', err);
    }
    if (!result) {
      throw new NotFoundException(`Could not find recipe record with ID ${id}`);
    }
    return result;
  }

  /** Fetch all recipes for the user
   *
   * @returns All available Recipe{} objects
   */
  async findAllUserRecipes(userId: number): Promise<Recipe[]> {
    let result: Recipe[];
    try {
      result = await this.recipesRepo.find({ where: { userId } });
    } catch (err) {
      Logger.error('Could not fetch recipe records', err);
    }
    return result;
  }

  /** Delete a Recipe record from the DB
   *
   * @param id ID of recipe record to delete
   * @returns Deleted recipe record
   * @throws NotFoundException if no record exists with given ID
   */
  async deleteRecipeById(id: number): Promise<Recipe> {
    let result: Recipe;

    /// 1. Grab record from DB
    const record: Recipe = await this.findOneById(id);

    /// 2. Remove record from the DB
    try {
      result = await this.recipesRepo.remove(record);
    } catch (err) {
      Logger.error(`Could not remove record with ID ${id}`, err);
    }

    if (!result) {
      throw new InternalServerErrorException(`Error removing recipe with ID ${id}`);
    }

    /// 3. Return deleted record
    return result;
  }

  /** Update an existing recipe record
   *
   * @param id ID of recipe record to be updated
   * @param newData New recipe data to be passed into record
   * @throws NotFoundException if no record exists with given ID
   */
  async updateRecipeById(
    id: number,
    newData: Partial<Recipe>,
  ): Promise<Recipe> {
    let result: Recipe;

    // 1. Grab record from DB
    const recipe = await this.findOneById(id);

    // 2. Update fields as needed
    Object.assign(recipe, newData);

    // 3. Save updated record to DB
    try {
      result = await this.recipesRepo.save(recipe);
    } catch (err) {
      Logger.error(`Could not update record with ID ${id}`, err);
    }

    if (!result) {
      throw new InternalServerErrorException(`Error updating recipe with ID ${id}`);
    }

    // 4. Return result
    return result;
  }

  /** Fetch all recipe records in DB - ADMINS ONLY
   *
   * @returns All available Recipe{} objects
   */
  async findAllRecipes(): Promise<Recipe[]> {
    let result: Recipe[];
    try {
      result = await this.recipesRepo.find();
    } catch (err) {
      Logger.error('Could not fetch recipe records', err);
    }
    return result;
  }
  
  /** Clear DB table - ADMINS ONLY */
  async clearTables(): Promise<void> {
    await this.recipesRepo.clear();
    await this.instructionsRepo.clear();
    await this.recipeIngredientsRepo.clear();
    await this.basicIngredientsRepo.clear();
  }
}
