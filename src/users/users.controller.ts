import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleExistsPipe } from 'src/common/pipes/role-exists.pipe';
import { Response } from 'express';
import { SwaggerDocs } from 'src/common/swagger/decorators';
import { createUserSwagger } from './swagger/user.swagger';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all tasks' })
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @SwaggerDocs(createUserSwagger())
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createUser(@Body('roleId', RoleExistsPipe) roleId: string, @Body() user: CreateUserDto) {
    try {
      const { id, ..._ } = await this.usersService.createUser(user);

      return { message: `User with id: ${id} successfully created` };

    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
