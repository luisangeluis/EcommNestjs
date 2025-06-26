import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductExistsPipe } from 'src/common/pipes/product-exists.pipe';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('add')
  async addToCart(
    @Body() dto: AddToCartDto,
    @Body("productId", ProductExistsPipe) productId: string
  ) {

  }
}
