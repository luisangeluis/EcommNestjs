import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BCryptService } from 'src/auth/hash/bcrypt.service';
import { IHashService } from 'src/auth/hash/hash-service.interface';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'IHashService', useClass: BCryptService },
  ],
  exports: [UsersService, 'IHashService'],
})
export class UsersModule {}
