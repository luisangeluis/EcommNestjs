import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductExistsPipe } from 'src/common/pipes/product-exists.pipe';
import { GuardsConsumer } from '@nestjs/core/guards';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }


  @Get('items')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async findUserCart(@Req() req: any) {
    const userId = req.user.userId;

    const cart = await this.cartService.findUserCart(userId);

    return cart;
  }

  @Post('items')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @Req() req: any
  ) {
    const userId = req.user.userId;

    const cartItem = await this.cartService.createCartItem(addToCartDto, userId);

    return { message: `Product with id: ${cartItem.productId} successfully Added` }
  }

  @Delete('items')
  @HttpCode(HttpStatus.OK)
  async cleanCart(@Req() req: any) {
    const userId = req.user.userId;
    await this.cartService.cleanUserCart(userId);

    return { message: `Cart successfully cleaned` }
  }
}
