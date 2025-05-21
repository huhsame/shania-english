import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as GoogleStrategy, StrategyOptions } from 'passport-google-oauth20';
import { UsersRepository } from '../../entities/users.repository';
import { ConfigService } from '@nestjs/config';

interface GoogleProfile {
    id: string;
    displayName: string;
    emails?: { value: string; verified: boolean }[];
    photos?: { value: string }[];
}

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(GoogleStrategy, 'google') {
    private readonly logger = new Logger(GoogleOAuthStrategy.name);

    constructor(
        private usersRepository: UsersRepository,
        private configService: ConfigService
    ) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: '/auth/google/redirect',
            scope: ['profile', 'email'],
        } as StrategyOptions);
    }

    async validate(_accessToken: string, _refreshToken: string, profile: GoogleProfile) {
        this.logger.log(`구글 인증 프로필: ${JSON.stringify({
            id: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName
        })}`);

        const { id, emails, displayName, photos } = profile;
        const email = emails?.[0].value;

        if (!email) {
            this.logger.error('구글 계정에서 이메일을 가져올 수 없습니다.');
            throw new Error('구글 계정에서 이메일을 가져올 수 없습니다.');
        }

        try {
            let user = await this.usersRepository.findByEmail(email);
            this.logger.log(`이메일로 사용자 조회 결과: ${user ? '사용자 찾음' : '사용자 없음'}`);

            if (!user) {
                const userData = {
                    googleId: id,
                    email,
                    name: displayName,
                    picture: photos?.[0].value,
                };
                this.logger.log(`새 사용자 생성 시도: ${JSON.stringify(userData)}`);

                try {
                    user = await this.usersRepository.create(userData);
                    this.logger.log(`사용자 생성 완료: ${JSON.stringify({
                        id: user.id,
                        email: user.email
                    })}`);
                } catch (error) {
                    this.logger.error(`사용자 생성 실패: ${error.message}`, error.stack);
                    throw error;
                }
            }

            return user; // req.user로 전달됨
        } catch (error) {
            this.logger.error(`인증 과정 오류: ${error.message}`, error.stack);
            throw error;
        }
    }
} 