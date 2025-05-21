import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    signJwt(user: User) {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };

        return this.jwtService.sign(payload);
    }

    validateToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            return null;
        }
    }
}
