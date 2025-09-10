import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryExistsPipe } from 'src/common/pipes/category-exists.pipe';
import { ProductExistsPipe } from 'src/common/pipes/product-exists.pipe';
import { NonEmptyBodyPipe } from 'src/common/pipes/non-empty-body.pipe';

describe('ProductsController (unit)', () => {
  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  let controller: ProductsController;
  let service: ProductsService;

  const mockCategoryPipe = { transform: (v: any) => v };
  const mockProductPipe = { transform: (v: any) => v };
  const mockBodyPipe = { transform: (v: any) => v };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockService }],
    })
      .overridePipe(CategoryExistsPipe)
      .useValue(mockCategoryPipe)
      .overridePipe(ProductExistsPipe)
      .useValue(mockProductPipe)
      .overridePipe(NonEmptyBodyPipe)
      .useValue(mockBodyPipe)
      .compile();

    controller = module.get(ProductsController);
    service = module.get(ProductsService);

    // jest.clearAllMocks();
    jest.resetAllMocks();
  });

  //FINDALL CONTROLLER
  describe('findAll', () => {
    const mockProducts = [
      { id: '123abc', title: 'title1' },
      { id: '234abc', title: 'title2' },
      { id: '345abc', title: 'title3' },
    ];
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should be called once', async () => {
      await controller.findAll();

      expect(mockService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return the products', async () => {
      mockService.findAll.mockResolvedValue(mockProducts);

      const products = await controller.findAll();

      expect(products).toEqual(mockProducts);
    });
  });

  // FINDONE CONTROLLER
  describe('findOne', () => {
    const mockProductId = 'abc123';
    const mockProduct = {
      id: 'abc123',
      title: 'a title ',
      description: 'a description',
      price: 100.5,
      categoryId: 'abc123',
    };

    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should be called once', async () => {
      mockService.findOne.mockResolvedValue(mockProduct);

      await controller.findOne(mockProductId);

      expect(mockService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should be called with the right parameters', async () => {
      mockService.findOne.mockResolvedValue(mockProduct);

      await controller.findOne(mockProductId);

      expect(mockService.findOne).toHaveBeenCalledWith(mockProductId);
    });

    it('should return the product', async () => {
      mockService.findOne.mockResolvedValue(mockProduct);

      const product = await mockService.findOne(mockProductId);

      expect(product).toEqual(mockProduct);
    });
  });

  //CREATE CONTROLLER
  describe('create', () => {
    const productDto = {
      title: 'a title ',
      description: 'a description',
      price: 100.5,
      categoryId: 'abc123',
    };
    const mockCreatedProduct = { id: 'productId', ...productDto };

    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should be called once', async () => {
      mockService.create.mockResolvedValue(mockCreatedProduct);

      await controller.create(productDto, productDto.categoryId);

      expect(mockService.create).toHaveBeenCalledTimes(1);
    });

    it('should be called with the right parameters', async () => {
      mockService.create.mockResolvedValue(mockCreatedProduct);

      await controller.create(productDto, productDto.categoryId);

      expect(mockService.create).toHaveBeenCalledWith(productDto);
    });

    it('should return the right message', async () => {
      mockService.create.mockResolvedValue(mockCreatedProduct);

      const result = await controller.create(productDto, productDto.categoryId);

      expect(result).toEqual({
        message: `Product with id: ${mockCreatedProduct.id} successfully created`,
      });
    });
  });

  //UPDATE CONTROLLER
  describe('update', () => {
    const product = {
      id: 'abc123',
      title: 'a title ',
      description: 'a description',
      price: 100.5,
      categoryId: 'abc123',
    };
    const productId = 'abc123';
    const data = { title: 'new title' };

    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should be called once', async () => {
      mockService.update.mockResolvedValue({ ...product, ...data });

      await controller.update(productId, product);

      expect(mockService.update).toHaveBeenCalledTimes(1);
    });

    it('should be called with the right parameters', async () => {
      mockService.update.mockResolvedValue({ ...product, ...data });

      await controller.update(productId, product);

      expect(mockService.update).toHaveBeenCalledWith(productId, product);
    });

    it('should return the right message', async () => {
      mockService.update.mockResolvedValue({ ...product, ...data });

      const result = await controller.update(productId, product);

      expect(result).toEqual({
        message: `Product with id: ${productId} successfully updated`,
      });
    });
  });

  //REMOVE CONTROLLER
  describe('remove', () => {
    const product = {
      id: 'abc123',
      title: 'a title ',
    };

    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('should be called once', async () => {
      mockService.findOne.mockResolvedValue(product);
      mockService.remove.mockResolvedValue(product);

      await controller.remove(product.id);

      expect(mockService.remove).toHaveBeenCalledTimes(1);
    });

    it('should be called with the right parameters', async () => {
      mockService.remove.mockResolvedValue(product);

      await controller.remove(product.id);

      expect(mockService.remove).toHaveBeenCalledWith(product.id);
    });

    it('should return the right message', async () => {
      mockService.remove.mockResolvedValue(product);
      const result = await controller.remove(product.id);

      expect(result).toEqual({
        message: `Product with id ${product.id} successfully deleted`,
      });
    });
  });
});
