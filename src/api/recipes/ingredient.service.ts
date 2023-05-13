import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/common/entities/ingredient.entity';
import { Unit } from 'src/common/entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
  private logger: Logger = new Logger(IngredientService.name);

  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepo: Repository<Ingredient>,
    @InjectRepository(Unit)
    private unitsRepo: Repository<Unit>,
  ) {}

  /** Finds all ingredients in the DB for a given recipeId
   *
   * @param recipeId Recipe id to search with
   * @returns List of ingredient objects
   * @throws NotFoundException if the recipeId is not found in the db
   */
  async findAll(recipeId: number): Promise<Ingredient[]> {
    let result: Ingredient[];

    // TODO: build IngredientService.findAll()

    return result;
  }

  /** Finds one ingredient record matching the given id
   *
   * @param id Ingredient id to search for
   * @returns Ingredient object
   * @throws NotFoundException if ingredient id is not found in the db
   */
  async findOneById(id: number): Promise<Ingredient> {
    let result: Ingredient;

    // TODO: build IngredientService.findOneById()

    return result;
  }

  /** Updates one ingredient record matching the given id
   *
   * @param id Ingredient id to search for
   * @param newData New ingredient data to save
   * @returns Updated Ingredient object
   * @throws NotFoundException if ingredient id is not found in the db
   * @throws InternalServerErrorException if the updates could not be saved DB
   */
  async updateOneById(
    id: number,
    newData: Partial<Ingredient>,
  ): Promise<Ingredient> {
    let result: Ingredient;

    // TODO: build IngredientService.updateOneById()

    return result;
  }

  /** Deletes one ingredient record matching the given id
   *
   * @param id Ingredient id to search for
   * @returns Updated Ingredient object
   * @throws NotFoundException if ingredient id is not found in the db
   * @throws InternalServerErrorException if the updates could not be saved DB
   */
  async deleteOneById(id: number): Promise<Ingredient> {
    let result: Ingredient;

    // TODO: build IngredientService.deleteOneById()

    return result;
  }

  /** Processes the list of ingredients and saves them each to the DB
   *
   * @param input Raw list of ingredients in JSON form
   */
  async processIngredients(input: any, recipeId: number): Promise<void> {
    /// For each ingredient in the list, create and save a record to the DB
    for (let i = 0; i < input.length; i++) {
      // let unitResult: Unit;
      // let newUnit: Unit;
      // let ingredientResult: Ingredient;
      let newIngredient: Ingredient;

      // if (input[i].units != '') {
      //   /// check if units are in DB and retrieve ID
      //   newUnit = await this.unitsRepo.findOneBy({ unit: input[i].units });

      //   if (newUnit == null) {
      //     /// If not, add new record and retrieve ID
      //     newUnit = this.unitsRepo.create({
      //       unit: input[i].units,
      //     });
      //     unitResult = await this.unitsRepo.save(newUnit);
      //   }
      // }

      try {
        newIngredient = this.ingredientRepo.create({
          name: input[i].name,
          quantity: input[i].quantity,
          preparation: input[i].preparation,
          units: input[i].units,
          recipeId,
        });
      } catch (e) {
        console.log(`Could not create ingredient record, ${e}`);
        throw new InternalServerErrorException(
          'Could not create ingredient record',
        );
      }

      if (newIngredient != null) {
        try {
          await this.ingredientRepo.save(newIngredient);
        } catch (e) {
          console.log(`Could not save ingredient to DB, ${e}`);
          throw new InternalServerErrorException(
            'Could not save ingredient to DB',
          );
        }
      }
    }

    // input.forEach(async (element) => {
    //   let unitResult: Unit;
    //   let newUnit: Unit;
    //   // let ingredientResult: Ingredient;
    //   let newIngredient: Ingredient;

    //   if (element.units != '') {
    //     /// check if units are in DB and retrieve ID
    //     newUnit = await this.unitsRepo.findOneBy({ unit: element.units });

    //     if (newUnit == null) {
    //       /// If not, add new record and retrieve ID
    //       newUnit = this.unitsRepo.create({
    //         unit: element.units,
    //       });
    //       unitResult = await this.unitsRepo.save(newUnit);
    //     }
    //   }

    //   try {
    //     newIngredient = this.ingredientRepo.create({
    //       name: element.name,
    //       quantity: element.quantity,
    //       preparation: element.preparation,
    //       unitsId: unitResult.id,
    //       recipeId,
    //     });
    //   } catch (e) {
    //     console.log(`Could not create ingredient record, ${e}`);
    //   }

    //   if (newIngredient != null) {
    //     try {
    //       await this.ingredientRepo.save(newIngredient);
    //     } catch (e) {
    //       console.log(`Could not save ingredient to DB, ${e}`);
    //     }
    //   }
    // });
  }
}
