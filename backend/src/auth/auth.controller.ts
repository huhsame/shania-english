import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../entities/users.repository';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
        private usersRepository: UsersRepository
    ) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        // 이 부분은 구글 로그인 페이지로 리디렉션됩니다.
        // Passport가 자동으로 처리
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleRedirect(@Req() req, @Res() res: Response) {
        // req.user는 GoogleStrategy의 validate 메소드에서 반환된 값
        const token = this.authService.signJwt(req.user);
        const frontendUrl = this.configService.get('FRONTEND_URL');

        // 프론트엔드의 콜백 처리 페이지로 JWT 토큰과 함께 리디렉션
        return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req) {
        // req.user는 JwtStrategy의 validate 메소드에서 반환된 값
        return req.user;
    }

    // 디버깅용 엔드포인트 - 실제 프로덕션에서는 제거 필요
    @Get('debug/users')
    async getAllUsers() {
        try {
            const users = await this.usersRepository.findAll();
            return {
                table: 'users',
                count: users.length,
                data: users
            };
        } catch (error) {
            return {
                error: error.message,
                stack: error.stack
            };
        }
    }
}
