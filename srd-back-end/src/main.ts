import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Star Rail Dashboard API')
    .setDescription('API for managing user data for the Star Rail Dashboard')
    .setVersion('1.0.0')
    .addServer('/api')
    .addTag('player')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();