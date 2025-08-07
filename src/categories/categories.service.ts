import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findById(id: string) {
    return await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
