import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleExistsPipe } from 'src/common/pipes/role-exists.pipe';
import { SwaggerDocs } from 'src/common/swagger/decorators';
import { createUserSwagger } from './swagger/user.swagger';
import { UserExistsPipe } from 'src/common/pipes/user-exists.pipe';
import { NonEmptyBodyPipe } from 'src/common/pipes/non-empty-body.pipe';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all tasks' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return one user by its id' })
  async findOne(
    @Param('id') id: string
  ) {
    return await this.usersService.findOne(id);
  }

  @Post('/')
  @SwaggerDocs(createUserSwagger())
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() user: CreateUserDto,
    @Body('roleId', RoleExistsPipe) roleId: string
  ) {
    const { id, ..._ } = await this.usersService.create(user);

    return { message: `User with id: ${id} successfully created` };
  }

  @Patch(':id')
  async update(
    @Param('id', UserExistsPipe) id: string,
    @Body(NonEmptyBodyPipe) dto: UpdateUserDto
  ) {
    await this.usersService.update(id, dto);

    return { message: `User with id ${id} successfully updated` }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', UserExistsPipe) id: string,
  ) {
    await this.usersService.remove(id);

    return { message: `User with id ${id} successfully deleted` }
  }

}
