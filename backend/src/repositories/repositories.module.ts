import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
} from '../entities';

import {
  UserRepository,
  SourceRepository,
  SentenceRepository,
  ExpressionRepository,
  SentenceExpressionRepository,
  DefaultExampleRepository,
  UserExampleRepository,
  UserBookmarkRepository,
  GeneratedPdfRepository,
  PdfDownloadRepository
} from './index';

const repositories = [
  UserRepository,
  SourceRepository,
  SentenceRepository,
  ExpressionRepository,
  SentenceExpressionRepository,
  DefaultExampleRepository,
  UserExampleRepository,
  UserBookmarkRepository,
  GeneratedPdfRepository,
  PdfDownloadRepository
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
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
    ])
  ],
  providers: [...repositories],
  exports: [...repositories]
})
export class RepositoriesModule {} 