import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from './common/envs/config.schema';
import { TypeOrmConfigService } from './common/services/typeorm.service';
import { AuthModule } from './auth/auth.module';
import { RecipesService } from './api/recipes/recipes.service';
import { RecipesController } from './api/recipes/recipes.controller';
import { RecipesModule } from './api/recipes/recipes.module';
import { UserModule } from './api/user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: `src/common/envs/${envFilePath}`,
      envFilePath: `src/common/envs/development.env`,
      validationSchema: configValidationSchema,
      isGlobal: true,
      load: [],
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    RecipesModule,
    UserModule,
    MailModule,
  ],
})
export class AppModule {}
