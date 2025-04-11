import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request, Response } from 'express';
import { SwaggerDocs } from 'src/common/swagger/decorators';
import { createProductSwagger } from './swagger/products.swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @SwaggerDocs(createProductSwagger())
  @Post()
  async create(
    @Body() product: CreateProductDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      // console.log(product.);

      const newProduct = await this.productsService.create(product);

      return response
        .status(HttpStatus.CREATED)
        .json({ message: 'Product succesfully created', data: newProduct });
    } catch (error) {
      console.log(error);

      return response.status(500).json({ message: error.message });
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
