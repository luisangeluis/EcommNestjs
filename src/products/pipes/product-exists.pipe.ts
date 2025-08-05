import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ProductExistsPipe implements PipeTransform {
  constructor(private readonly productsService: ProductsService) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const productId = value;

    if (!productId)
      return value;

    const product = await this.productsService.findById(productId);

    if (!product) throw new NotFoundException(`Product with ID ${productId} does not exist`,);

    return value;
  }
}
