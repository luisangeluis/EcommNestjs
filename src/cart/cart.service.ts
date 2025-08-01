import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    async findUserCart(userId: string) {
        const cart = await this.prisma.cart.upsert({
            where: { userId },
            update: {},
            create: { userId },
            include: {
                cartItems: {
                    select: { quantity: true, productId: true }
                }
            }
        })

        return cart;
    }

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
                    quantity: addToCart.quantity,
                    productId: addToCart.productId,
                    cartId: cart.id,
                },
            })

            return cartItem;
        })

    }

    async cleanUserCart(userId: string) {
        const cart = await this.findUserCart(userId);

        if (!cart || cart.cartItems.length === 0) return true;

        await this.prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });

        return true;
    }
}
