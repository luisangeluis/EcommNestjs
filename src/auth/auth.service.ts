import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async login(login: LoginDTO) {
    const user = await this.validateUser(login.email, login.password);

    return { user, token: "abc123" }
  }

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
