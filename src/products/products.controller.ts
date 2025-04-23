import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
<<<<<<< HEAD
  HttpStatus,
  HttpCode,
  HttpException,
=======
  Req,
  Res,
  HttpStatus,
>>>>>>> d62a7bf9faef8f464b5a799b50629ee01ffdeda8
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
<<<<<<< HEAD
=======
import { Request, Response } from 'express';
>>>>>>> d62a7bf9faef8f464b5a799b50629ee01ffdeda8
import { SwaggerDocs } from 'src/common/swagger/decorators';
import { createProductSwagger } from './swagger/products.swagger';
import { CategoryExistsPipe } from 'src/common/pipes/category-exists.pipe';

@Controller('products')
export class ProductsController {
<<<<<<< HEAD
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @SwaggerDocs(createProductSwagger())
  @HttpCode(HttpStatus.CREATED)
=======
  constructor(private readonly productsService: ProductsService) {}

  @SwaggerDocs(createProductSwagger())
>>>>>>> d62a7bf9faef8f464b5a799b50629ee01ffdeda8
  @Post()
  async create(
    @Body('categoryId', CategoryExistsPipe) categoryId: string,
    @Body() product: CreateProductDto,
<<<<<<< HEAD
  ) {
    try {
      const { id, ..._ } = await this.productsService.create(product);

      return { message: `Product with id: ${id} successfully created` }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

=======
    @Res() response: Response,
  ) {
    try {
      const newProduct = await this.productsService.create(product);

      return response
        .status(HttpStatus.CREATED)
        .json({ message: 'Product succesfully created', data: newProduct });
    } catch (error) {
      console.log(error);

      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

>>>>>>> d62a7bf9faef8f464b5a799b50629ee01ffdeda8
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
