import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from './repositories/repositories.module';
import { WebhookModule } from './webhook/webhook.module';
import { UserModule } from './user/user.module';
import {
  User,
  Source,
  Sentence,
  Expression,
  SentenceExpression,
  DefaultExample,
  UserExample,
  UserBookmark,
  GeneratedPdf,
  PdfDownload
} from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'shania_english_db',
      entities: [
        User,
        Source,
        Sentence,
        Expression,
        SentenceExpression,
        DefaultExample,
        UserExample,
        UserBookmark,
        GeneratedPdf,
        PdfDownload
      ],
      synchronize: true, // 개발 환경에서만 true 권장
      retryAttempts: 5,
      retryDelay: 3000,
    }),
    AuthModule,
    RepositoriesModule,
    WebhookModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
