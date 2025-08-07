import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { CategoryExists } from 'src/common/validators/category-exists.validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  price: number;

  @IsNotEmpty()
  @IsUUID()
  @CategoryExists({ message: 'Category not found' })
  categoryId: string;
}
