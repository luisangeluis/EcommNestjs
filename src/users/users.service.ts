import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findById(id: User["id"]) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: User["email"]) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async create(user: CreateUserDto) {
    return await this.prisma.user.create({ data: user });
  }

  async updateById(id: User["id"], data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data
    })
  }

  async removeById(id: User["id"]) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
