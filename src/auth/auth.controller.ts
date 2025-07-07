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
    // const token = await this.authService.login(login);
    const { id: userId, email, roleId, ...restOfUser } = await this.authService.validateUser(login.email, login.password);
    const token = await this.authService.login({ userId, email, roleId });

    return { message: `User with id: ${userId} successfully logged`, data: token }
  }
}
