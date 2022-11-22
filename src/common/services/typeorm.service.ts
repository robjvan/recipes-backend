import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
// import { RecipeIngredient } from '../entities/recipe-ingredient.entity';
// import { Recipe } from 'src/common/entities/recipe.entity';
// import { User } from 'src/common/entities/user.entity';
// import { InstructionStep } from 'src/common/entities/instruction-step.entity';
// import { UserSubscription } from 'src/common/entities/user-subscription.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('DB_HOST'),
      port: parseInt(this.config.get<string>('DB_PORT')),
      database: this.config.get<string>('DB_NAME'),
      username: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASS'),
      entities: [__dirname + '/../**/*.entity.{ts,js}'],
      // entities: [Recipe, User, RecipeIngredient, InstructionStep, UserSubscription, Location],
      migrations: [__dirname + '/../**/*.migration.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, //! TODO: NEVER use true in production!!!
      
    };
  }
}
