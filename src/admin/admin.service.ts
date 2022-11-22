import {
  Injectable,
  // Logger,
} from '@nestjs/common';
// import { RecipesService } from 'src/api/recipes/recipes.service';
// import { UserSubscriptionService } from 'src/api/users/user-subscription.service';
// import { UsersService } from 'src/api/users/users.service';

@Injectable()
export class AdminService {
  constructor() // private userSubscriptionsService: UserSubscriptionService,
  // private recipesService: RecipesService,
  // private usersService: UsersService,
  {
    //
  }

  /** Clear DB tables */
  async clearTables(): Promise<void> {
    // Logger.debug('Clearing Users table...');
    // Logger.debug('Clearing Countries table...');
    // Logger.debug('Clearing DemographicInfos table...');
    // Logger.debug('Clearing UserLoginRecords table...');
    // await this.usersService.clearTables();
    // Logger.debug('Clearing UserSubcriptions table...');
    // await this.userSubscriptionsService.clearTable();
    // Logger.debug('Clearing Recipes table...');
    // Logger.debug('Clearing RecipeIngredients table...');
    // Logger.debug('Clearing Ingredients table...');
    // Logger.debug('Clearing InstructionSteps table...');
    // await this.recipesService.clearTables();
  }
}
