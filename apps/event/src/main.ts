import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { webcrypto } from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  if (!globalThis.crypto) {
    globalThis.crypto = webcrypto as any;
  }
  await app.listen(process.env.PORT);
  console.log(`Event Server is running on port ${process.env.PORT}`);
}
bootstrap();
