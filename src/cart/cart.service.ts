import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    async createCartItem(addToCart: AddToCartDto, userId: string) {
        return await this.prisma.$transaction(async (tx) => {
            const cart = await tx.cart.upsert({
                where: { userId },
                update: {},
                create: { userId },

            });

            const cartItem = await tx.cartItem.upsert({
                where: {
                    cartId_productId: {
                        cartId: cart.id,
                        productId: addToCart.productId,
                    },
                },
                update: {
                    quantity: addToCart.quantity,
                },
                create: {
                    cartId: cart.id,
                    productId: addToCart.productId,
                    quantity: addToCart.quantity,
                },
            })

            return cartItem;
        })

    }
}
