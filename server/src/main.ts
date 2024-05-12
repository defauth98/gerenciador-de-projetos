import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3333;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Project Manager API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  Logger.log(`App running in http://localhost:${port}`);

  app.enableCors();

  await app.listen(port);
}

bootstrap();
