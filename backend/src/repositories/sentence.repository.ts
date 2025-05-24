import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sentence } from '../entities/sentence.entity';

@Injectable()
export class SentenceRepository {
  constructor(
    @InjectRepository(Sentence)
    private sentenceRepository: Repository<Sentence>,
  ) {}

  async findAll(): Promise<Sentence[]> {
    return this.sentenceRepository.find();
  }

  async findById(id: string): Promise<Sentence | null> {
    return this.sentenceRepository.findOne({ 
      where: { id },
      relations: ['source']
    });
  }

  async findBySourceId(sourceId: string): Promise<Sentence[]> {
    return this.sentenceRepository.find({ 
      where: { sourceId },
      relations: ['source']
    });
  }

  async create(sentenceData: Partial<Sentence>): Promise<Sentence | null> {
    const sentence = this.sentenceRepository.create(sentenceData);
    return this.sentenceRepository.save(sentence);
  }

  async update(id: string, sentenceData: Partial<Sentence>): Promise<Sentence | null> {
    await this.sentenceRepository.update(id, sentenceData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void | null> {
    await this.sentenceRepository.delete(id);
  }

  async updateTranslation(id: string, translation: string): Promise<Sentence | null> {
    await this.sentenceRepository.update(id, { korean_translation: translation });
    return this.findById(id);
  }
} 