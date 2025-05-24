import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix 설정 (auth는 제외)
  app.setGlobalPrefix('api', {
    exclude: ['auth', 'auth/google', 'auth/google/redirect', 'auth/me']
  });

  // CORS 설정
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
