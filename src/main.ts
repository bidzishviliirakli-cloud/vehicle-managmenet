import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const SWAGGER_PROPERTIES = {
  path: 'api',
  title: 'Car management API',
  tag: 'car-management-api',
  version: '1.0',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 7000;

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_PROPERTIES.title)
    .setVersion(SWAGGER_PROPERTIES.version)
    .addTag(SWAGGER_PROPERTIES.tag)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PROPERTIES.path, app, document);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
  );

  await app.listen(PORT);
}

bootstrap();
