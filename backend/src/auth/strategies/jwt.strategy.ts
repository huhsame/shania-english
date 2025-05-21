import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../../entities/users.repository';

interface JwtPayload {
    sub: string;
    email: string;
    name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private usersRepository: UsersRepository
    ) {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET이 설정되지 않았습니다.');
        }

        // 이 구성은 PassportStrategy의 내부 타입을 우회합니다 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.usersRepository.findByEmail(payload.email);

        if (!user) {
            throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
        }

        return user;
    }
} 