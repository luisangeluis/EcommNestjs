import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  // private users: any = [
  //   {
  //     id: 1,
  //     user: 'juan',
  //   },
  //   {
  //     id: 2,
  //     user: 'pablo',
  //   },
  // ];

  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async createUser(user: CreateUserDto) {
    return await this.prisma.user.create({ data: user });
  }
}
