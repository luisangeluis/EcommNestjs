import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
  imports: [ProductsModule, AuthModule],

})
export class CartModule { }
