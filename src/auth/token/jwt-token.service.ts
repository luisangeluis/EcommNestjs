import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token-service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  verify(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}
