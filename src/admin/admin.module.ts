import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesService } from 'src/api/recipes/recipes.service';
import { UserSubscriptionService } from 'src/api/users/user-subscription.service';
import { UsersService } from 'src/api/users/users.service';
import { UserCountry } from 'src/common/entities/country.entity';
import { DemographicInfo } from 'src/common/entities/demographic-info.entity';
import { BasicIngredient } from 'src/common/entities/basic-ingredient.entity';
import { InstructionStep } from 'src/common/entities/instruction-step.entity';
import { RecipeIngredient } from 'src/common/entities/recipe-ingredient.entity';
import { Recipe } from 'src/common/entities/recipe.entity';
import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';
import { UserSubscription } from 'src/common/entities/user-subscription.entity';
import { User } from 'src/common/entities/user.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recipe,
      User,
      UserSubscription,
      RecipeIngredient,
      BasicIngredient,
      InstructionStep,
      UserCountry,
      UserLoginRecord,
      DemographicInfo,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],

  controllers: [AdminController],
  providers: [UsersService, UserSubscriptionService, RecipesService, AdminService],
})
export class AdminModule {}
