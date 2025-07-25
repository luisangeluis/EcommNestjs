import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [ProductsModule, AuthModule],

})
export class CartModule { }
