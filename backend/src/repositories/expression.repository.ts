import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expression } from '../entities/expression.entity';

@Injectable()
export class ExpressionRepository {
  constructor(
    @InjectRepository(Expression)
    private expressionRepository: Repository<Expression>,
  ) {}

  async findAll(): Promise<Expression[]> {
    return this.expressionRepository.find();
  }

  async findById(id: string): Promise<Expression> {
    return this.expressionRepository.findOne({ where: { id } });
  }

  async findByText(text: string): Promise<Expression> {
    return this.expressionRepository.findOne({ where: { expression_text: text } });
  }

  async create(expressionData: Partial<Expression>): Promise<Expression> {
    const expression = this.expressionRepository.create(expressionData);
    return this.expressionRepository.save(expression);
  }

  async update(id: string, expressionData: Partial<Expression>): Promise<Expression> {
    await this.expressionRepository.update(id, expressionData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.expressionRepository.delete(id);
  }

  async search(query: string): Promise<Expression[]> {
    return this.expressionRepository
      .createQueryBuilder('expression')
      .where('expression.expression_text ILIKE :query OR expression.korean_meaning ILIKE :query', 
        { query: `%${query}%` })
      .getMany();
  }
} 