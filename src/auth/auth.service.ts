import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { TokenPayload, TokenService } from './interfaces/token-service.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly tokenService: TokenService) { }

  async login(payload: TokenPayload) {
    const token = await this.tokenService.generateToken(payload);

    return token;
  }

  //TODO USE THE USERS SERVICE
  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException(`User or password incorrect`);
    }

    if (pass !== user.password) {
      throw new UnauthorizedException(`User or password incorrect`);
    }

    const { password, ...safeUser } = user;

    return safeUser;
  }
}
