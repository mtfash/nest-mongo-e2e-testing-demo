import { useContainer } from 'class-validator';
import { NestFactory } from '@nestjs/core';
import {
  HttpStatus,
  ValidationPipe,
  ValidationPipeOptions,
  VersioningType,
} from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const validationOptions: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  };
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  await app.listen(3000);
}
bootstrap();
