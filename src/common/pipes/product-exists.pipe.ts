import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ProductExistsPipe implements PipeTransform {
  constructor(private readonly productsService: ProductsService) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const productId = value;

    if (!productId)
      return value;

    await this.productsService.findOne(productId);

    return value;
  }
}
