import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from '../entities/source.entity';

@Injectable()
export class SourceRepository {
  constructor(
    @InjectRepository(Source)
    private sourceRepository: Repository<Source>,
  ) {}

  async findAll(): Promise<Source[]> {
    return this.sourceRepository.find();
  }

  async findById(id: string): Promise<Source | null> {
    return this.sourceRepository.findOne({ where: { id } });
  }

  async findByUrl(url: string): Promise<Source | null> {
    return this.sourceRepository.findOne({ where: { url } });
  }

  async create(sourceData: Partial<Source>): Promise<Source> {
    const source = this.sourceRepository.create(sourceData);
    return this.sourceRepository.save(source);
  }

  async update(id: string, sourceData: Partial<Source>): Promise<Source | null> {
    await this.sourceRepository.update(id, sourceData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.sourceRepository.delete(id);
  }

  async findByContentType(contentType: 'text' | 'webpage' | 'youtube'): Promise<Source[]> {
    return this.sourceRepository.find({ where: { content_type: contentType } });
  }

  async updateProcessedStatus(id: string, processedAt: Date): Promise<Source | null> {
    await this.sourceRepository.update(id, { processed_at: processedAt });
    return this.findById(id);
  }
} 