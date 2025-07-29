import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductExistsPipe } from 'src/common/pipes/product-exists.pipe';
import { GuardsConsumer } from '@nestjs/core/guards';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('items')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @Body("productId", ProductExistsPipe) _productId: string,
    @Req() req: any
  ) {
    const userId = req.user.userId;

    const cartItem = await this.cartService.createCartItem(addToCartDto, userId);

    return { message: `Product with id: ${cartItem.productId} successfully Added` }
  }
}
