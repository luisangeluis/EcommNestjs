import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import { LoginDTO } from './dt/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<any> {
        // Aquí validas al usuario (en BD o estático)
        if (email === 'luis@gmail.com' && password === '1234') {
            return { userId: 1, username: 'luis' };
        }
        return null;
    }

    async login(loginDTO: LoginDTO) {
        const { email, password } = loginDTO

        const user = await this.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, role: user.roleId };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }
}
