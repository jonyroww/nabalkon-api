import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import dotenv from 'dotenv';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

dotenv.config();
async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Nabalkon API')
    .setDescription('The Nabalkon API description')
    .setVersion('1.0')
    .setBasePath(process.env.BASE_URL)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
