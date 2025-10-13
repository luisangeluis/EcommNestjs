import * as bcrypt from 'bcrypt';
import { IHashService } from './hash-service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BCryptService implements IHashService {
  private readonly saltRounds = 10;

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
