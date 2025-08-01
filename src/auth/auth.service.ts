import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import { LoginDTO } from './dt/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) { }

    private async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.usersService.findOneByEmail(email);

            if (user.password !== password)
                throw new UnauthorizedException('Invalid credentials');

            const { password: pass, ...result } = user;

            return result;
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async login(loginDTO: LoginDTO) {
        const { email, password } = loginDTO

        const user = await this.validateUser(email, password);

        const payload = { userId: user.id, email: user.email, roleId: user.roleId };
        const token = await this.jwtService.signAsync(payload);
        return { access_token: token, userId: user.id };
    }
}
