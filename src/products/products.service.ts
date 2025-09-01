import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private pagination: PaginationService,
  ) {}

  async findAll(query: GetProductsQueryDto) {
    //TODO Create service class to re-use pagination
    return this.pagination.paginate(
      this.prisma.product, // 👈 pasamos el modelo de Prisma
      {
        where: {
          title: query.title ? { contains: query.title } : undefined,
          description: query.description
            ? { contains: query.description }
            : undefined,
          price: query.price,
          categoryId: query.categoryId,
        },
        orderBy: { createdAt: 'desc' },
      },
      { page: query.page, limit: query.limit },
    );
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
