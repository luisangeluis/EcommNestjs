import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string) {
    const cart = await this.prisma.cart.create({
      data: {
        userId: userId,
      },
    });

    return cart;
  }
}
