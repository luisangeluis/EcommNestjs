import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from './jwt/jwt.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt/jwt-strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtService, JwtStrategy],
  // providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtService],
  // exports: [AuthService],
})
export class AuthModule { }
