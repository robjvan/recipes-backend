import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AdminGuard } from './common/guards/admin.guard';
import { PremiumGuard } from './common/guards/premium.guard';
// import pgDataSource from './common/data.source';
// import * as serviceAccount from 'C:/secrets/recipes/firebase_credentials.json';

// dotenv.config();
// const NEST_LOGGING = false;

async function bootstrap() {
  // const opts: NestApplicationOptions = {};

  // if (!NEST_LOGGING) {
  //   opts.logger = false;
  // }
  // firebase.initializeApp({
  //   credential: firebase.credential.cert({
  //     privateKey: serviceAccount.private_key,
  //     clientEmail: serviceAccount.client_email,
  //     projectId: serviceAccount.project_id,
  //   }),
  //   databaseURL: serviceAccount.database_url,
  // });

  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port = config.get<number>('PORT');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port, () => {
    Logger.log(`Server initialized on port ${port} and waiting for requests`);
    Logger.debug('[WEB]', config.get<string>('BASE_URL'));
  });
}

bootstrap();
