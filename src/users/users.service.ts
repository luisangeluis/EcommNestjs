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

  async findOne(id: User["id"]) {
    const result = await this.prisma.user.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException(`User with id: ${id} doesn't exist`);
    }

    return result;
  }

  async create(user: CreateUserDto) {
    return await this.prisma.user.create({ data: user });
  }

  async update(id: User["id"], data: UpdateUserDto) {
    await this.findOne(id);

    return await this.prisma.user.update({
      where: { id },
      data
    })
  }

  async remove(id: User["id"]) {
    await this.findOne(id);

    return await this.prisma.user.delete({ where: { id } });
  }
}
