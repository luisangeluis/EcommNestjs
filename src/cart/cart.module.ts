import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductExistsConstrain } from 'src/common/validators/product-exists.validator';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
  imports: [ProductsModule, AuthModule, CommonModule],

})
export class CartModule { }
