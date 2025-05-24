import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
    private readonly logger = new Logger(UsersRepository.name);

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        this.logger.log(`이메일로 사용자 찾기: ${email}`);
        try {
            const user = await this.usersRepository.findOne({ where: { email } });
            this.logger.log(`이메일 조회 결과: ${user ? '사용자 찾음' : '사용자 없음'}`);
            return user;
        } catch (error) {
            this.logger.error(`이메일 조회 중 오류: ${error.message}`, error.stack);
            throw error;
        }
    }

    async findByGoogleId(googleId: string): Promise<User | null> {
        this.logger.log(`구글 ID로 사용자 찾기: ${googleId}`);
        try {
            const user = await this.usersRepository.findOne({ where: { googleId } });
            this.logger.log(`구글 ID 조회 결과: ${user ? '사용자 찾음' : '사용자 없음'}`);
            return user;
        } catch (error) {
            this.logger.error(`구글 ID 조회 중 오류: ${error.message}`, error.stack);
            throw error;
        }
    }

    async create(userData: Partial<User>): Promise<User> {
        this.logger.log(`새 사용자 생성: ${JSON.stringify({
            email: userData.email,
            googleId: userData.googleId
        })}`);
        try {
            const user = this.usersRepository.create(userData);
            const savedUser = await this.usersRepository.save(user);
            this.logger.log(`사용자 저장 완료, ID: ${savedUser.id}`);

            // 디버깅: 데이터베이스에 실제로 저장되었는지 확인
            const foundUser = await this.usersRepository.findOne({ where: { id: savedUser.id } });
            this.logger.log(`저장 후 사용자 조회: ${foundUser ? '성공' : '실패'}`);

            return savedUser;
        } catch (error) {
            this.logger.error(`사용자 생성 중 오류: ${error.message}`, error.stack);
            throw error;
        }
    }

    async findAll(): Promise<User[]> {
        this.logger.log('모든 사용자 조회');
        try {
            const users = await this.usersRepository.find();
            this.logger.log(`총 ${users.length}명의 사용자를 찾았습니다.`);
            return users;
        } catch (error) {
            this.logger.error(`모든 사용자 조회 중 오류: ${error.message}`, error.stack);
            throw error;
        }
    }

    async updateGoodnoteMail(userId: string, goodnoteMail: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다');
        }
        
        user.goodnote_mail = goodnoteMail;
        return this.usersRepository.save(user);
    }
} 