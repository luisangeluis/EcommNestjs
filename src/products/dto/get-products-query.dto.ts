import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { CategoryExists } from 'src/common/validators/category-exists.validator';

export class GetProductsQueryDto {
  @IsOptional()
  @IsNumberString()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumberString()
  @Min(1)
  @Max(30)
  limit?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsUUID()
  @CategoryExists({ message: 'Category not found' })
  categoryId?: string;
}
