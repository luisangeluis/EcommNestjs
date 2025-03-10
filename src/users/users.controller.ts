import {
  Body,
  Controller,
  Get,
  Post,
  RawBody,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('/')
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
}
