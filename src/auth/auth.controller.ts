import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  async login(
    @Body() login: LoginDTO
  ) {
    const { user, token } = await this.authService.login(login);

    return { message: `User with id: ${user.id} successfully logged`, data: token }
  }
}
