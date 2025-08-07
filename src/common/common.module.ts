import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { ProductExistsConstrain } from './validators/product-exists.validator';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoryExistsConstrain } from './validators/category-exists.validator';

@Module({
    imports: [ProductsModule, CategoriesModule],
    providers: [ProductExistsConstrain, CategoryExistsConstrain],
    exports: [ProductExistsConstrain, CategoryExistsConstrain]
})
export class CommonModule { }
