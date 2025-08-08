// src/auth/jwt.strategy.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        console.log("JwtStrategy");
        const userId = payload.userId;
        const user = await this.usersService.findById(userId);

        if (!user) throw new NotFoundException();

        return { userId: payload.userId, email: payload.email, roleId: payload.roleId };
    }
}
