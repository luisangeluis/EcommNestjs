import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) return null;

    return product;
  }

  async create(product: CreateProductDto) {
    return await this.prisma.product.create({ data: product });
  }

  async update(id: string, data: UpdateProductDto) {
    await this.findById(id);

    return await this.prisma.product.update({
      where: { id },
      data
    })
  }

  async remove(id: string) {
    await this.findById(id);

    return await this.prisma.product.delete({ where: { id } });
  }
}
