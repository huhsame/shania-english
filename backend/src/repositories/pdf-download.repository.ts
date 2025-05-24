import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PdfDownload, DownloadType } from '../entities/pdf-download.entity';

@Injectable()
export class PdfDownloadRepository {
  constructor(
    @InjectRepository(PdfDownload)
    private pdfDownloadRepository: Repository<PdfDownload>,
  ) {}

  async findAll(): Promise<PdfDownload[]> {
    return this.pdfDownloadRepository.find({
      relations: ['user', 'pdf']
    });
  }

  async findById(id: string): Promise<PdfDownload | null> {
    return this.pdfDownloadRepository.findOne({
      where: { id },
      relations: ['user', 'pdf']
    });
  }

  async findByUserId(userId: string): Promise<PdfDownload[]> {
    return this.pdfDownloadRepository.find({
      where: { userId },
      relations: ['user', 'pdf']
    });
  }

  async findByPdfId(pdfId: string): Promise<PdfDownload[]> {
    return this.pdfDownloadRepository.find({
      where: { pdfId },
      relations: ['user', 'pdf']
    });
  }

  async findByDownloadType(downloadType: DownloadType): Promise<PdfDownload[]> {
    return this.pdfDownloadRepository.find({
      where: { downloadType },
      relations: ['user', 'pdf']
    });
  }

  async create(downloadData: Partial<PdfDownload>): Promise<PdfDownload | null> {
    const download = this.pdfDownloadRepository.create(downloadData);
    return this.pdfDownloadRepository.save(download);
  }

  async recordDownload(userId: string, pdfId: string, downloadType: DownloadType): Promise<PdfDownload | null> {
    const download = this.pdfDownloadRepository.create({
      userId,
      pdfId,
      downloadType,
      downloadedAt: new Date()
    });
    return this.pdfDownloadRepository.save(download);
  }

  async getDownloadStats(pdfId: string): Promise<{ total: number; byType: Record<DownloadType, number> }> {
    const downloads = await this.findByPdfId(pdfId);
    const total = downloads.length;
    
    const byType = {
      [DownloadType.EMAIL]: 0,
      [DownloadType.GOODNOTE]: 0,
      [DownloadType.WEB]: 0
    };
    
    downloads.forEach(download => {
      byType[download.downloadType]++;
    });
    
    return { total, byType };
  }
} 