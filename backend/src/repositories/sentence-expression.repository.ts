import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SentenceExpression } from '../entities/sentence-expression.entity';

@Injectable()
export class SentenceExpressionRepository {
  constructor(
    @InjectRepository(SentenceExpression)
    private sentenceExpressionRepository: Repository<SentenceExpression>,
  ) {}

  async findAll(): Promise<SentenceExpression[]> {
    return this.sentenceExpressionRepository.find({
      relations: ['sentence', 'expression']
    });
  }

  async findById(id: string): Promise<SentenceExpression> {
    return this.sentenceExpressionRepository.findOne({
      where: { id },
      relations: ['sentence', 'expression']
    });
  }

  async findBySentenceId(sentenceId: string): Promise<SentenceExpression[]> {
    return this.sentenceExpressionRepository.find({
      where: { sentenceId },
      relations: ['sentence', 'expression']
    });
  }

  async findByExpressionId(expressionId: string): Promise<SentenceExpression[]> {
    return this.sentenceExpressionRepository.find({
      where: { expressionId },
      relations: ['sentence', 'expression']
    });
  }

  async create(data: Partial<SentenceExpression>): Promise<SentenceExpression> {
    const sentenceExpression = this.sentenceExpressionRepository.create(data);
    return this.sentenceExpressionRepository.save(sentenceExpression);
  }

  async delete(id: string): Promise<void> {
    await this.sentenceExpressionRepository.delete(id);
  }

  async findBySentenceIdAndExpressionId(sentenceId: string, expressionId: string): Promise<SentenceExpression> {
    return this.sentenceExpressionRepository.findOne({
      where: { sentenceId, expressionId },
      relations: ['sentence', 'expression']
    });
  }
} 