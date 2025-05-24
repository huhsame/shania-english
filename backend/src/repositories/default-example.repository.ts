import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultExample } from '../entities/default-example.entity';

@Injectable()
export class DefaultExampleRepository {
  constructor(
    @InjectRepository(DefaultExample)
    private defaultExampleRepository: Repository<DefaultExample>,
  ) {}

  async findAll(): Promise<DefaultExample[]> {
    return this.defaultExampleRepository.find({
      relations: ['expression']
    });
  }

  async findById(id: string): Promise<DefaultExample> {
    return this.defaultExampleRepository.findOne({
      where: { id },
      relations: ['expression']
    });
  }

  async findByExpressionId(expressionId: string): Promise<DefaultExample[]> {
    return this.defaultExampleRepository.find({
      where: { expressionId },
      relations: ['expression']
    });
  }

  async create(exampleData: Partial<DefaultExample>): Promise<DefaultExample> {
    const example = this.defaultExampleRepository.create(exampleData);
    return this.defaultExampleRepository.save(example);
  }

  async update(id: string, exampleData: Partial<DefaultExample>): Promise<DefaultExample> {
    await this.defaultExampleRepository.update(id, exampleData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.defaultExampleRepository.delete(id);
  }

  async updateTranslation(id: string, translation: string): Promise<DefaultExample> {
    await this.defaultExampleRepository.update(id, { korean_translation: translation });
    return this.findById(id);
  }
} 