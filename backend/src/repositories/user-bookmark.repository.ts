import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBookmark } from '../entities/user-bookmark.entity';

@Injectable()
export class UserBookmarkRepository {
  constructor(
    @InjectRepository(UserBookmark)
    private userBookmarkRepository: Repository<UserBookmark>,
  ) {}

  async findAll(): Promise<UserBookmark[]> {
    return this.userBookmarkRepository.find({
      relations: ['user', 'expression']
    });
  }

  async findById(id: string): Promise<UserBookmark> {
    return this.userBookmarkRepository.findOne({
      where: { id },
      relations: ['user', 'expression']
    });
  }

  async findByUserId(userId: string): Promise<UserBookmark[]> {
    return this.userBookmarkRepository.find({
      where: { userId },
      relations: ['user', 'expression']
    });
  }

  async findByExpressionId(expressionId: string): Promise<UserBookmark[]> {
    return this.userBookmarkRepository.find({
      where: { expressionId },
      relations: ['user', 'expression']
    });
  }

  async findByUserIdAndExpressionId(userId: string, expressionId: string): Promise<UserBookmark> {
    return this.userBookmarkRepository.findOne({
      where: { userId, expressionId },
      relations: ['user', 'expression']
    });
  }

  async create(bookmarkData: Partial<UserBookmark>): Promise<UserBookmark> {
    const bookmark = this.userBookmarkRepository.create(bookmarkData);
    return this.userBookmarkRepository.save(bookmark);
  }

  async delete(id: string): Promise<void> {
    await this.userBookmarkRepository.delete(id);
  }

  async toggleBookmark(userId: string, expressionId: string): Promise<{ isBookmarked: boolean; bookmark?: UserBookmark }> {
    const existingBookmark = await this.findByUserIdAndExpressionId(userId, expressionId);
    
    if (existingBookmark) {
      await this.delete(existingBookmark.id);
      return { isBookmarked: false };
    } else {
      const newBookmark = await this.create({ userId, expressionId });
      return { isBookmarked: true, bookmark: newBookmark };
    }
  }
} 