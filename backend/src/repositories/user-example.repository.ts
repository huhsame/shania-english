import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserExample } from '../entities/user-example.entity';

@Injectable()
export class UserExampleRepository {
  constructor(
    @InjectRepository(UserExample)
    private userExampleRepository: Repository<UserExample>,
  ) {}

  async findAll(): Promise<UserExample[]> {
    return this.userExampleRepository.find({
      relations: ['user', 'expression']
    });
  }

  async findById(id: string): Promise<UserExample> {
    return this.userExampleRepository.findOne({
      where: { id },
      relations: ['user', 'expression']
    });
  }

  async findByUserId(userId: string): Promise<UserExample[]> {
    return this.userExampleRepository.find({
      where: { userId },
      relations: ['user', 'expression']
    });
  }

  async findByExpressionId(expressionId: string): Promise<UserExample[]> {
    return this.userExampleRepository.find({
      where: { expressionId },
      relations: ['user', 'expression']
    });
  }

  async findByUserIdAndExpressionId(userId: string, expressionId: string): Promise<UserExample[]> {
    return this.userExampleRepository.find({
      where: { userId, expressionId },
      relations: ['user', 'expression']
    });
  }

  async create(exampleData: Partial<UserExample>): Promise<UserExample> {
    const example = this.userExampleRepository.create(exampleData);
    return this.userExampleRepository.save(example);
  }

  async update(id: string, exampleData: Partial<UserExample>): Promise<UserExample> {
    await this.userExampleRepository.update(id, exampleData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.userExampleRepository.delete(id);
  }

  async updateTranslation(id: string, translation: string): Promise<UserExample> {
    await this.userExampleRepository.update(id, { korean_translation: translation });
    return this.findById(id);
  }
} 