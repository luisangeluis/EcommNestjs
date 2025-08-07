import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class CategoryExistsPipe implements PipeTransform {
  constructor(private readonly categoriesService: CategoriesService) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const categoryId = value;

    if (!categoryId)
      return value;

    const category = await this.categoriesService.findById(categoryId);

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${categoryId} does not exist`,
      );
    }

    return value;
  }
}
