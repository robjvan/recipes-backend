import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration, OpenAIApi } from 'openai';
import { CreateRecipeDto } from 'src/common/entities/dto/create-recipe.dto';
import { UpdateRecipeDto } from 'src/common/entities/dto/update-recipe.dto';
import { Recipe } from 'src/common/entities/recipe.entity';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { IngredientService } from './ingredient.service';
import { InstructionService } from './instruction.service';
import { GenerateRecipeDto } from 'src/common/entities/dto/generate_recipe.dto';

@Injectable()
export class RecipesService {
  private logger: Logger = new Logger(RecipesService.name);

  constructor(
    @InjectRepository(Recipe)
    private recipeRepo: Repository<Recipe>,
    // @InjectRepository(Recipe)
    // private recipeRepo: Repository<Recipe>,
    // @InjectRepository(Recipe)
    // private recipeRepo: Repository<Recipe>,
    private ingredientService: IngredientService,
    private instructionService: InstructionService,
  ) {}

  /** Create and save a new recipe to the DB
   *
   * @param recipe Recipe DTO from front-end
   * @returns Newly created Recipe object
   * @throws InternalServerErrorException if the Recipe could not be created
   */
  async createRecipe(recipe: CreateRecipeDto): Promise<Recipe> {
    let result: Recipe;

    const {
      title,
      cookTime,
      prepTime,
      description,
      servings,
      ingredients,
      instructions,
    } = recipe;

    /// Create and save a new Recipe object using the passed info
    /// Extract recipeId from resulting record
    /// Loop through ingredients, create and save new Ingredient record for each
    /// Look through instructions, create and save new Instruction record for each

    // TODO: Build RecipesService.createRecipe()

    return result;
  }

  /** Fetches all recipes that belong to the user.
   *
   * Typically used in front-end init or full refresh to sync local DB with backend data.
   *
   * @param userId User id to search recipes for
   * @returns List of recipe objects or empty array if no recipes are found
   * @throws NotFoundException if fetching from the DB fails
   *
   * Example:
   * ```ts
   * const userRecipes: Recipe[] = await recipesService.findAll(user.id);
   * ```
   */
  async findAll(userId: number): Promise<Recipe[]> {
    let result: Recipe[];

    try {
      result = await this.recipeRepo.findBy({ userId });
    } catch (err) {
      this.logger.error(
        `Could not fetch recipes for user with id ${userId}`,
        err,
      );
      throw new NotFoundException(
        `Could not fetch recipes for user with id ${userId}`,
      );
    }

    return result;
  }

  /** Fetch one recipe by ID
   *
   * @param id ID of recipe record to find
   * @returns Recipe object
   * @throws NotFoundException is no record exists with given ID
   *
   * Example:
   * ```ts
   * const result: Recipe = await recipesService.findOneById(recipe.id);
   * ```
   */
  async findOneById(id: number): Promise<Recipe> {
    let result: Recipe;

    try {
      result = await this.recipeRepo.findOneBy({ id });
    } catch (err) {
      this.logger.error(`Could not fetch recipe with id ${id}`, err);
      throw new NotFoundException(`Could not fetch recipe with id ${id}`);
    }

    return result;
  }

  /** Update an existing recipe record
   *
   * @param id ID of recipe record to be updated
   * @param newData New recipe data to be saved to the record
   * @throws NotFoundException if no record exists with given ID
   * @throws InternalServerErrorException if record could not be updated
   *
   * Example:
   * ```ts
   * const result: Recipe = await recipesService.updateOneById(recipe.id, newData);
   * ```
   */
  async updateOneById(id: number, newData: UpdateRecipeDto) {
    let result: Recipe;

    // 1. Grab record from DB
    const recipe = await this.findOneById(id);

    // 2. Update fields as needed
    Object.assign(recipe, newData);

    // 3. Save updated record to DB
    try {
      result = await this.recipeRepo.save(recipe);
    } catch (err) {
      this.logger.error(`Could not update record with ID ${id}`, err);
    }

    if (!result) {
      throw new InternalServerErrorException(
        `Error updating recipe with ID ${id}`,
      );
    }

    // 4. Return result
    return result;
  }

  /** Delete a Recipe record from the DB
   *
   * @param id ID of recipe record to delete
   * @returns Deleted recipe record
   * @throws NotFoundException if no record exists with given ID
   *
   * Example:
   * ```ts
   * const result: Recipe = await recipesService.deleteOneById(recipe.id);
   * ```
   */
  async deleteOneById(id: number) {
    // TODO: When we remove a recipe, need to remove associated ingredients and instructions too

    let result: Recipe;
    let record: Recipe;

    /// 1. Grab record from DB
    try {
      record = await this.findOneById(id);
    } catch {
      throw new NotFoundException();
    }

    /// 2. Remove record from the DB
    try {
      result = await this.recipeRepo.remove(record);
    } catch (err) {
      this.logger.error(`Could not remove record with ID ${id}`, err);
    }

    if (!result) {
      throw new InternalServerErrorException(
        `Error removing recipe with ID ${id}`,
      );
    }

    /// 3. Return deleted record
    return result;
  }

  /** Removes a Recipe record from the user's collection, but retain the record
   *
   * @param id ID of recipe record to remove
   * @returns Removed recipe record
   * @throws NotFoundException if no record exists with given ID
   * @throws InternalServerErrorException if save back to the DB fails
   *
   * Example:
   * ```ts
   * const result: Recipe = await recipesService.removeOneById(recipe.id);
   * ```
   */
  async removeOneById(id: number) {
    let result: Recipe;
    let record: Recipe;

    /// 1. Grab record from DB
    try {
      record = await this.findOneById(id);
    } catch {
      throw new NotFoundException();
    }

    /// 2. Change userId to remove it from user's collection
    record.userId = -1;

    /// 3. Save altered record back to the DB
    try {
      result = await this.recipeRepo.save(record);
    } catch (err) {
      this.logger.error('Could not save updated record back to DB', err);
      throw new InternalServerErrorException(
        'Could not save updated record back to DB',
      );
    }

    /// 4. Return result
    return result;
  }

  /** Uses OpenAI API to generate new recipe
   *
   * @param recipeRequest Food item as requested by the user
   * @returns New Recipe object
   */
  async generateRecipe(
    request: GenerateRecipeDto,
    user: User,
  ): Promise<Recipe> {
    const { input, servings } = request;
    let result: Recipe;
    let rawRecipeJson: any;

    const configuration: Configuration = new Configuration({
      apiKey: process.env.API_KEY,
    });
    const openai: OpenAIApi = new OpenAIApi(configuration);

    const completion: any = await openai.createChatCompletion({
      messages: [
        {
          role: 'system',
          content: `You are an experienced chef. You have been tasked with creating meals that are easy to prepare and can be cooked in a short amount of time. This is your recipe template - you will always follow the same JSON structure, you will only reply with the formatted recipe data, you will never use fractions for qunitites, and you will always use standard units for ingredient measurements: ${recipeTemplate}`,
        },
        {
          role: 'user',
          content: `Using the template given and your knowledge of flavours and presentation, generate a recipe for ${input} that will feed ${servings} people.  `,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    if (completion.data != null) {
      try {
        rawRecipeJson = JSON.parse(completion.data.choices[0].message.content);
      } catch (e) {
        console.log(`Error parsing recipe, ${e}`);
        console.log(
          `Raw recipe: ${completion.data.choices[0].message.content}`,
        );
        throw new InternalServerErrorException('Error parsing recipe, ${e}');
      }

      if (rawRecipeJson != null) {
        const newRecipe: Recipe = this.recipeRepo.create({
          name: rawRecipeJson.name,
          description: rawRecipeJson.description,
          cookTime: rawRecipeJson.cookTime,
          prepTime: rawRecipeJson.prepTime,
          servings: rawRecipeJson.servings,
          userId: user.id,
        });

        /// Save new recipe object to the DB
        try {
          result = await this.recipeRepo.save(newRecipe);

          if (result != null) {
            /// Recipe successfully saved to the DB, now process/save Ingredients and Instructions
            // TODO(Rob): Add ingredient and instruction processing
            await this.ingredientService.processIngredients(
              rawRecipeJson.ingredients,
              result.id,
            );
            await this.instructionService.processInstructions(
              rawRecipeJson.instructions,
              result.id,
            );
          }
        } catch (e) {
          if (e.code === '23505') {
            // duplicate entry error code
            throw new ConflictException('Recipe already exists');
          } else {
            console.log(`Could not save recipe to DB, ${e}`);
            throw new InternalServerErrorException(
              'Could not save recipe to DB',
            );
          }
        }
      }
    }

    return result;
  }
}

const recipeTemplate = `{
  "name": "Chicken and Mushroom Fettuccine",
  "cookTime": 25,
  "description": "A classic pasta dish with tender chicken and earthy mushrooms in a creamy sauce.",
  "prepTime": 15,
  "servings": 4,
  "ingredients": [
    {
      "name": "chicken breast",
      "quantity": "2",
      "units": "pounds",
      "preparation": "cut into bite-sized pieces"
    },
    { "name": "salt", "quantity": 1, "units": "teaspoon", "preparation": "" },
    {
      "name": "black pepper",
      "quantity": "1",
      "units": "teaspoon",
      "preparation": ""
    },
    {
      "name": "olive oil",
      "quantity": "2",
      "units": "tablespoons",
      "preparation": ""
    },
    {
      "name": "butter",
      "quantity": "2",
      "units": "tablespoons",
      "preparation": ""
    },
    {
      "name": "garlic",
      "quantity": "4",
      "units": "cloves",
      "preparation": "minced"
    },
    {
      "name": "mushrooms",
      "quantity": "8",
      "units": "ounces",
      "preparation": "sliced"
    },
    { "name": "heavy cream", "quantity": "1", "units": "cup", "preparation": "" },
    {
      "name": "parmesan cheese",
      "quantity": "1",
      "units": "cup",
      "preparation": "grated"
    },
    {
      "name": "fettuccine pasta",
      "quantity": "1",
      "units": "pound",
      "preparation": "cooked according to package instructions"
    }
  ],
  "instructions": [
    "Heat olive oil in a large skillet over medium-high heat.",
    "Season chicken with salt and pepper, then add to the skillet and cook until browned, about 5-7 minutes.",
    "Remove chicken from skillet and set aside.",
    "Add butter, garlic, and mushrooms to the skillet and sauté until mushrooms are browned and tender, about 5-7 minutes.",
    "Add heavy cream and parmesan cheese to the skillet, stirring until the cheese has melted and the sauce is thickened, about 3-5 minutes.",
    "Add the cooked chicken to the skillet and stir to coat in the sauce.",
    "Serve the chicken and mushroom sauce over cooked fettuccine pasta."
  ]
}
`;
