import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
