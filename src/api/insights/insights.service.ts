import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Recipe } from '../../common/entities/recipe.entity';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { AllergenCountDto } from './dto/allergen-count.dto';

//* Insights service will offer recipe collection metrics
//* These are intended for user amusement

@Injectable()
export class InsightsService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipesRepo: Repository<Recipe>,
  ) {}

  /** Return total number of recipes for a user
   * 
   * @param userId Id of user to count recipes for
   * @returns Number of recipes that currently exist in DB for the given userId
   */
  async countAllRecipes(userId: number): Promise<number> {
    let recipeCount = 0;

    try {
      recipeCount = (await this.recipesRepo.find({ where: { userId } })).length;
    } catch (err) {
      Logger.error(`Could not fetch list of recipes for user ${userId}`, err);
    }

    return recipeCount;
  }

  /** Count number of recipes that contain various allergens.
   * Checks for eggs, wheat, soy, seafood, peanuts, tree nuts, dairy.
   *
   * @param userId UserID of current user
   * @returns AllergenCountDto representing number of recipes containing each allergen.
   * ie: { 3,1,12,0,2,0,10 }
   */
  async countRecipesByAllergen(userId: number): Promise<AllergenCountDto> {
    let eggs = 0;
    let wheat = 0;
    let soy = 0;
    let seafood = 0;
    let peanuts = 0;
    let treeNuts = 0;
    let dairy = 0;

    /// 2. Try to grab all recipes created the by user
    try {
      const recipes = await this.recipesRepo.find({ where: { userId } });

      /// 3. For each recipe, check allergen fields and increment
      /// counters if recipe contains each allergen
      recipes.forEach((recipe) => {
        recipe.containsEggs ? eggs++ : null;
        recipe.containsWheat ? wheat++ : null;
        recipe.containsSoy ? soy++ : null;
        recipe.containsSeafood ? seafood++ : null;
        recipe.containsPeanuts ? peanuts++ : null;
        recipe.containsTreeNuts ? treeNuts++ : null;
        recipe.containsDairy ? dairy++ : null;
      });
    } catch (err) {
      Logger.error(`Error retrieving recipes for user ${userId}`, err);
    }

    /// 4. Return result
    return { eggs, wheat, soy, seafood, peanuts, treeNuts, dairy };
  }
}
