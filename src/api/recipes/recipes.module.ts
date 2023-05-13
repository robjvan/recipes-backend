import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/common/entities/recipe.entity';
import { PassportModule } from '@nestjs/passport';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { IngredientService } from './ingredient.service';
import { InstructionService } from './instruction.service';
import { Instruction } from 'src/common/entities/instruction.entity';
import { Ingredient } from 'src/common/entities/ingredient.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from '../user/user.service';
import { SubscriptionService } from '../user/subscription.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';
import { UserSignupRecord } from 'src/common/entities/user-signup-record.entity';
import { UserSubscription } from 'src/common/entities/user-subscription.entity';
import { User } from 'src/common/entities/user.entity';
import { Unit } from 'src/common/entities/unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recipe,
      Ingredient,
      Instruction,
      User,
      UserSubscription,
      UserSignupRecord,
      UserLoginRecord,
      Unit,
    ]),
    PassportModule,
  ],
  controllers: [RecipesController],
  providers: [
    AuthService,
    RecipesService,
    IngredientService,
    InstructionService,
    UserService,
    SubscriptionService,
    MailService,
    JwtService,
  ],
})
export class RecipesModule {}
