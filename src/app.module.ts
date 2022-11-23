import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouteInfo } from '@nestjs/common/interfaces';
import { RecipesModule } from './api/recipes/recipes.module';
import { configValidationSchema } from './common/envs/config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './common/services/typeorm.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { InsightsModule } from './api/insights/insights.module';
import { ReportingModule } from './admin/reporting/reporting.module';
import { AdminModule } from './admin/admin.module';
// import { getEnvPath } from './common/envs/env.helper';
// import * as rateLimit from 'express-rate-limit';

// const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
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
    RecipesModule,
    AuthModule,
    UsersModule,
    InsightsModule,
    ReportingModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {
  private readonly _limitedRoutes: RouteInfo[] = [
    // { path: 'api/v1/users/', method: RequestMethod.POST },
    // { path: 'api/v1/users/activate', method: RequestMethod.POST },
    // { path: 'api/v1/users/password/update', method: RequestMethod.ALL },
    // { path: 'api/v1/users/password', method: RequestMethod.ALL },
    // { path: 'api/v1/users/password/reset', method: RequestMethod.ALL },
    // { path: 'api/v1/users/resend', method: RequestMethod.ALL },
    // { path: 'api/v1/users/password/mobile', method: RequestMethod.ALL },
    // { path: 'api/v1/users/password/mobile/reset', method: RequestMethod.ALL },
    // { path: 'api/v1/files/', method: RequestMethod.GET },
  ];

  // configure(consumer: MiddlewareConsumer): void {
  //   // limit standard endpoints to 100 requests per minute
  //   consumer
  //     .apply(
  //       rateLimit({
  //         windowMS: 1 * 60 * 1000,
  //         max: 100,
  //       }),
  //     )
  //     .exclude(...this._limitedRoutes)
  //     .forRoutes('api/*');
  //   // limit restricted endpoints to 1 request per 15 seconds
  //   consumer
  //     .apply(
  //       rateLimit({
  //         windowMs: 15 * 1000,
  //         max: 3,
  //       }),
  //     )
  //     .forRoutes(...this._limitedRoutes);
  // }
}
