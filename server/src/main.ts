import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

import { AppModule } from './app/app.module';
import { LoggingInterceptor } from './interceptors/request-log.interceptor';
import { validateEnv } from './validateEnv';

config();

async function bootstrap() {
  validateEnv();

  const port = process.env.PORT || 3333;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Project Manager API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  Logger.log(`App running in http://localhost:${port}`);

  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(port);
}

bootstrap();
