import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instruction } from 'src/common/entities/instruction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstructionService {
  private logger: Logger = new Logger(InstructionService.name);

  constructor(
    @InjectRepository(Instruction)
    private instructionRepo: Repository<Instruction>,
  ) {}

  /** Finds all instructions in the DB for a given recipeId
   *
   * @param recipeId Recipe id to search with
   * @returns List of Instruction objects
   * @throws NotFoundException if the recipeId is not found in the db
   */
  async findAll(recipeId: number): Promise<Instruction[]> {
    let results: Instruction[];

    try {
      results = await this.instructionRepo.findBy({ recipeId });
    } catch (err) {
      this.logger.error(
        `Could not fetch instructions for recipe with id: ${recipeId}`,
      );
      throw new NotFoundException();
    }

    return results;
  }

  /** Finds one instruction record matching the given id
   *
   * @param id Instruction id to search for
   * @returns Instruction object
   * @throws NotFoundException if instruction id is not found in the db
   */
  async findOneById(id: number): Promise<Instruction> {
    let result: Instruction;

    try {
      result = await this.instructionRepo.findOneBy({ id });
    } catch (err) {
      this.logger.error(
        `Could not fetch instructions for recipe with id: ${result}`,
      );
      throw new NotFoundException();
    }

    return result;
  }

  /** Updates one instruction record matching the given id
   *
   * @param id Instruction id to search for
   * @param newData New instruction data to save
   * @returns Updated Instruction object
   * @throws NotFoundException if instruction id is not found in the db
   * @throws InternalServerErrorException if the updates could not be saved DB
   */
  async updateOneById(
    id: number,
    newData: Partial<Instruction>,
  ): Promise<Instruction> {
    let result: Instruction;

    // TODO: build InstructionService.updateOneById()

    return result;
  }

  /** Removes records associated with the given recipeId
   * @param recipeId RecipeId to remove ingredients for
   * @returns List of removed records
   * @throws NotFoundException if list of instructions could not be fetched
   * @throws InternelServerErrorException if instructions could not be removed
   *
   * Example:
   * ```ts
   * const results: Instruction[] = await InstructionService.deleteAllByRecipeId(recipe.id);
   * ```
   */
  async deleteAllByRecipeId(recipeId: number): Promise<Instruction[]> {
    /// Delete all intruction steps that exists for a given recipeId
    let instructions: Instruction[];
    let result: Instruction[];

    try {
      instructions = await this.instructionRepo.findBy({
        recipeId,
      });
    } catch (err) {
      this.logger.error(
        `Could not fetch list of instructions for recipe with id ${recipeId}`,
        err,
      );
      throw new NotFoundException();
    }

    if (instructions.length > 0) {
      try {
        result = await this.instructionRepo.remove(instructions);
      } catch (err) {
        this.logger.error(
          `Could not remove instructions for recipe with id ${recipeId}`,
        );
        throw new InternalServerErrorException();
      }
    }
    return result;
  }

  /** Deletes one instruction record matching the given id
   *
   * @param id Instruction id to search for
   * @returns Updated Instruction object
   * @throws NotFoundException if instruction id is not found in the db
   * @throws InternalServerErrorException if the updates could not be saved DB
   */
  async deleteOneById(id: number): Promise<Instruction> {
    let result: Instruction;

    // TODO: build InstructionService.deleteOneById()

    return result;
  }

  /** Creates and saves a new Instruction record to the DB
   *
   * @param input List of string objects to process as instructions
   * @param recipeId Id of the recipe that the instructions belong to
   * @throws InternalServerErrorException if instruction could not be parsed
   * @throws InternalServerErrorException if new record could not be saved to DB
   *
   * Example:
   * ```ts
   * await instructionService.processInstructions(newInstructions, recipeId);
   * ```
   */
  async processInstructions(input: string[], recipeId: number): Promise<void> {
    for (let i = 0; i < input.length; i++) {
      let newInstruction: Instruction;

      try {
        newInstruction = this.instructionRepo.create({
          index: i,
          instruction: input[i],
          recipeId,
        });
      } catch (e) {
        console.log(`Could not create new instruction, ${e}`);
        throw new InternalServerErrorException(
          'Could not create new instruction',
        );
      }

      if (newInstruction != null) {
        try {
          await this.instructionRepo.save(newInstruction);
        } catch (e) {
          console.log(`Could not save new instruction to DB, ${e}`);
          throw new InternalServerErrorException(
            'Could not save new instruction to DB',
          );
        }
      }
    }
  }
}
