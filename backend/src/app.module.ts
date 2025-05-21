import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'shania_english_db',
      entities: [],
      synchronize: true, // 개발 환경에서만 true 권장
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
