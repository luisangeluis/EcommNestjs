import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

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
  price?: number;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
