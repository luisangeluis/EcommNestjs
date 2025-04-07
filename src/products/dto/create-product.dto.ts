import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
