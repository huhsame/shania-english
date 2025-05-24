import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getUserProfile(userId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      return {
        email: user.email,
        name: user.name,
        personalizationInfo: user.personalization_info,
        goodNoteEmail: user.goodnote_mail
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('사용자 프로필을 조회할 수 없습니다.');
    }
  }
  
  async updatePersonalizationInfo(
    userId: string, 
    updateUserInfoDto: UpdateUserInfoDto
  ) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 개인화 정보 업데이트
      user.personalization_info = updateUserInfoDto.personalizationInfo;
      
      // GoodNote 이메일이 제공된 경우 업데이트
      if (updateUserInfoDto.goodNoteEmail) {
        user.goodnote_mail = updateUserInfoDto.goodNoteEmail;
      }

      const updatedUser = await this.userRepository.save(user);
      
      return {
        success: true,
        message: '개인화 정보가 성공적으로 업데이트되었습니다.',
        data: {
          personalizationInfo: updatedUser.personalization_info,
          goodNoteEmail: updatedUser.goodnote_mail
        }
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('개인화 정보 업데이트에 실패했습니다.');
    }
  }
} 