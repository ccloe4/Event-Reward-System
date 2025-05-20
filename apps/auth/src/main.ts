import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 필드는 제거
      forbidNonWhitelisted: true, // 정의되지 않은 필드는 에러 발생
      transform: true, // payload -> DTO 자동 변환
    }),
  );

  await app.listen(process.env.PORT);
  console.log(`Auth Server is running on port ${process.env.PORT}`);
}
bootstrap();
