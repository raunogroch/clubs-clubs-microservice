import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { RpcCustomExceptionsFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Microservice');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new RpcCustomExceptionsFilter());

  await app.listen(envs.port);

  logger.log(`Clubs is running on: ${envs.port}`);
}
bootstrap();
