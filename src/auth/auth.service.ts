import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TokenPayload, TokenService } from './interfaces/token-service.interface';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly tokenService: TokenService) { }

  async login(login: LoginDTO) {
    const { email, password } = login;

    const user = await this.validateUser(email, password);

    const tokenPayload = { userId: user.id, email: user.email, roleId: user.roleId }
    const token = await this.tokenService.generateToken(tokenPayload);

    return { userId: user.id, token };

  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException("User or password incorrect");

    if (password !== user.password) throw new UnauthorizedException("User or password incorrect");

    const { password: pass, ...restOfUser } = user;
    return restOfUser
  }

  // async login(payload: TokenPayload) {
  //   const token = await this.tokenService.generateToken(payload);

  //   return token;
  // }

  // //TODO USE THE USERS SERVICE
  // async validateUser(email: string, pass: string) {
  //   const user = await this.usersService.findOneByEmail(email);

  //   if (!user) {
  //     throw new UnauthorizedException(`User or password incorrect`);
  //   }

  //   if (pass !== user.password) {
  //     throw new UnauthorizedException(`User or password incorrect`);
  //   }

  //   const { password, ...safeUser } = user;

  //   return safeUser;
  // }
}
