import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneratedPdf, PDFType, GenerationStatus } from '../entities/generated-pdf.entity';

@Injectable()
export class GeneratedPdfRepository {
  constructor(
    @InjectRepository(GeneratedPdf)
    private generatedPdfRepository: Repository<GeneratedPdf>,
  ) {}

  async findAll(): Promise<GeneratedPdf[]> {
    return this.generatedPdfRepository.find({
      relations: ['source', 'user']
    });
  }

  async findById(id: string): Promise<GeneratedPdf | null> {
    return this.generatedPdfRepository.findOne({
      where: { id },
      relations: ['source', 'user']
    });
  }

  async findBySourceId(sourceId: string): Promise<GeneratedPdf[]> {
    return this.generatedPdfRepository.find({
      where: { sourceId },
      relations: ['source', 'user']
    });
  }

  async findByUserId(userId: string): Promise<GeneratedPdf[]> {
    return this.generatedPdfRepository.find({
      where: { userId },
      relations: ['source', 'user']
    });
  }

  async findByPdfType(pdfType: PDFType): Promise<GeneratedPdf[]> {
    return this.generatedPdfRepository.find({
      where: { pdfType },
      relations: ['source', 'user']
    });
  }

  async findBySourceIdAndPdfType(sourceId: string, pdfType: PDFType): Promise<GeneratedPdf[]> {
    return this.generatedPdfRepository.find({
      where: { sourceId, pdfType },
      relations: ['source', 'user']
    });
  }

  async findBySourceIdAndUserId(sourceId: string, userId: string): Promise<GeneratedPdf[]> {
    return this.generatedPdfRepository.find({
      where: { sourceId, userId },
      relations: ['source', 'user']
    });
  }

  async findCommonPdf(sourceId: string): Promise<GeneratedPdf | null> {
    return this.generatedPdfRepository.findOne({
      where: { 
        sourceId, 
        pdfType: PDFType.COMMON,
        generationStatus: GenerationStatus.COMPLETED
      },
      relations: ['source']
    });
  }

  async findPersonalizedPdf(sourceId: string, userId: string): Promise<GeneratedPdf | null> {
    return this.generatedPdfRepository.findOne({
      where: { 
        sourceId, 
        userId,
        pdfType: PDFType.PERSONALIZED,
        generationStatus: GenerationStatus.COMPLETED
      },
      relations: ['source', 'user']
    });
  }

  async create(pdfData: Partial<GeneratedPdf>): Promise<GeneratedPdf | null> {
    const pdf = this.generatedPdfRepository.create(pdfData);
    return this.generatedPdfRepository.save(pdf);
  }

  async update(id: string, pdfData: Partial<GeneratedPdf>): Promise<GeneratedPdf | null> {
    await this.generatedPdfRepository.update(id, pdfData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void | null> {
    await this.generatedPdfRepository.delete(id);
  }

  async updateGenerationStatus(id: string, status: GenerationStatus, generatedAt?: Date): Promise<GeneratedPdf | null> {
    const updateData: Partial<GeneratedPdf> = { generationStatus: status };
    
    if (status === GenerationStatus.COMPLETED && generatedAt) {
      updateData.generatedAt = generatedAt;
    }
    
    await this.generatedPdfRepository.update(id, updateData);
    return this.findById(id);
  }
} 