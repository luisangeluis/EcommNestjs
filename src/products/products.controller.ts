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
  HttpException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SwaggerDocs } from 'src/common/swagger/decorators';
import { createProductSwagger } from './swagger/products.swagger';
import { CategoryExistsPipe } from 'src/common/pipes/category-exists.pipe';
import { ProductExistsPipe } from 'src/common/pipes/product-exists.pipe';
import { NonEmptyBodyPipe } from 'src/common/pipes/non-empty-body.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    try {
      return this.productsService.findAll();
    } catch (error) {
      throw new HttpException("An error ocurred", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.productsService.findOne(id);
    } catch (error) {
      throw new HttpException("An error ocurred", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @SwaggerDocs(createProductSwagger())
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body('categoryId', CategoryExistsPipe) categoryId: string,
    @Body() product: CreateProductDto,
  ) {
    try {
      const { id, ..._ } = await this.productsService.create(product);

      return { message: `Product with id: ${id} successfully created` }
    } catch (error) {
      throw new HttpException("An error ocurred", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id', ProductExistsPipe) id: string,
    @Body(NonEmptyBodyPipe) updateProductDto: UpdateProductDto
  ) {
    try {

      await this.productsService.update(id, updateProductDto);

      return { message: `Product with id: ${id} successfully updated` }
    } catch (error) {
      throw new HttpException("An error ocurred", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param("id", ProductExistsPipe) id: string) {
    try {
      return this.productsService.remove(id);
    } catch (error) {
      throw new HttpException("An error ocurred", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
