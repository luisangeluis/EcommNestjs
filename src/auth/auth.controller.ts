import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';
import { LoginDTO } from './dt/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post("login")
  async login(
    @Body() loginDTO: LoginDTO,
  ) {
    console.log({ loginDTO });

    const result = await this.authService.login(loginDTO);
    return { message: `User with id:${result.userId}`, token: result.access_token }
  }
}
