import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './token/jwt-token.service';
import { TokenService } from './interfaces/token-service.interface';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtTokenService, // importante: registra la clase concreta
    {
      provide: TokenService,
      useExisting: JwtTokenService, // aquí se enlaza la interfaz con la implementación
    },
  ],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
    })
  ]
})
export class AuthModule { }
