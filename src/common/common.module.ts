import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { ProductExistsConstrain } from './validators/product-exists.validator';

@Module({
    imports: [ProductsModule],
    providers: [ProductExistsConstrain],
    exports: [ProductExistsConstrain]
})
export class CommonModule { }
