import { NestFactory } from '@nestjs/core';
import { StandardSchemaValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  console.log('APP Started (Before NestFactory create)');

  const app = await NestFactory.create(AppModule, { logger: false });

  console.log('APP Started (After NestFactory create)');

  app.useGlobalPipes(new StandardSchemaValidationPipe());

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);

  console.log('APP Started (After app listen await)');
}
await bootstrap();
