import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(login: LoginDto) {
    return { email: login.email, pass: login.password, message: 'hola' };
  }
}
