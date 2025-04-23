import {
  Body,
  Controller,
  Get,
<<<<<<< HEAD
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
=======
  Post,
  RawBody,
  UsePipes,
  ValidationPipe,
>>>>>>> d62a7bf9faef8f464b5a799b50629ee01ffdeda8
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleExistsPipe } from 'src/common/pipes/role-exists.pipe';
<<<<<<< HEAD
import { Response } from 'express';
import { SwaggerDocs } from 'src/common/swagger/decorators';
import { createUserSwagger } from './swagger/user.swagger';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) { }
=======

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
>>>>>>> d62a7bf9faef8f464b5a799b50629ee01ffdeda8

  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all tasks' })
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

<<<<<<< HEAD
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
=======
  @Post('/')
  createUser(
    @Body('roleId', RoleExistsPipe) roleId: string,
    @Body() user: CreateUserDto,
  ) {
    return this.usersService.createUser(user);
>>>>>>> d62a7bf9faef8f464b5a799b50629ee01ffdeda8
  }
}
