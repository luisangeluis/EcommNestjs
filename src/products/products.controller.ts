import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SwaggerDocs } from 'src/common/swagger/decorators';
import { createProductSwagger } from './swagger/products.swagger';
import { CategoryExistsPipe } from 'src/common/pipes/category-exists.pipe';
import { ProductExistsPipe } from 'src/common/pipes/product-exists.pipe';
import { NonEmptyBodyPipe } from 'src/common/pipes/non-empty-body.pipe';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  static findAll: any;
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async finById(
    @Param('id', ProductExistsPipe) id: string,
  ) {
    return await this.productsService.findById(id);
  }

  @SwaggerDocs(createProductSwagger())
  @HttpCode(HttpStatus.CREATED)
  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(
    @Body() product: CreateProductDto,
    @Body('categoryId', CategoryExistsPipe) categoryId: string,
  ) {
    return await this.productsService.create(product);

  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ProductExistsPipe) id: string,
    @Body(NonEmptyBodyPipe) updateProductDto: UpdateProductDto
  ) {
    return await this.productsService.updateById(id, updateProductDto);

  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ProductExistsPipe) id: string) {
    await this.productsService.removeById(id);
  }
}
