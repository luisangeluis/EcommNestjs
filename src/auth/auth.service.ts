import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TokenService } from './token/token-service.interface';
import { IHashService } from './hash/hash-service.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject('TokenService') private tokenService: TokenService,
    @Inject('IHashService') private readonly hashService: IHashService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials.');

    const isPasswordValid = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials.');

    const payload = { sub: user.id, email: user.email };

    return {
      data: { token: await this.tokenService.sign(payload) },
      message: 'Login successful',
      error: '',
    };
  }

  async register(createUser: CreateUserDto) {
    return await this.usersService.register(createUser);
  }
}
