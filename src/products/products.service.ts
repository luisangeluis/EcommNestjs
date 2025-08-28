import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page = 1, limit = 10, ...filters }: GetProductsQueryDto) {
    //TODO Create service class to re-use pagination
    const skip = (page - 1) * limit;

    return await this.prisma.product.findMany({
      where: filters,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async create(product: CreateProductDto) {
    return await this.prisma.product.create({ data: product });
  }

  async updateById(id: string, data: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async removeById(id: string) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
