

import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryExistsPipe } from 'src/common/pipes/category-exists.pipe';
import { ProductExistsPipe } from 'src/common/pipes/product-exists.pipe';
import { NonEmptyBodyPipe } from 'src/common/pipes/non-empty-body.pipe';
import { NotFoundException } from '@nestjs/common';

describe('ProductsController (unit)', () => {
    const mockService = {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        remove: jest.fn()

    };
    let controller: ProductsController;
    let service: ProductsService;


    const mockCategoryPipe = { transform: (v: any) => v };
    const mockProductPipe = { transform: (v: any) => v };
    const mockBodyPipe = { transform: (v: any) => v };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                { provide: ProductsService, useValue: mockService }
            ],
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

        jest.clearAllMocks();
        jest.resetAllMocks()
    });



    //FINDALL CONTROLLER
    describe("findAll", () => {
        it("should be defined", () => {
            expect(controller.findAll).toBeDefined();
        })

        it("should be called once", async () => {
            await controller.findAll();

            expect(mockService.findAll).toHaveBeenCalledTimes(1);
        })
    })

    // FINDONE CONTROLLER
    describe("findOne", () => {
        const mockProductId = "abc123";
        const product = {
            id: "abc123", title: "a title ", description: "a description", price: 100.50, categoryId: "abc123"
        }

        it('should throw NotFoundException if product is not found', async () => {
            mockService.findOne.mockResolvedValue(null);

            await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
        });

        it("should be defined", () => {
            expect(controller.findOne).toBeDefined();
        })

        it("should be called once", async () => {
            mockService.findOne.mockResolvedValue(product);

            await controller.findOne(mockProductId);

            expect(mockService.findOne).toHaveBeenCalledTimes(1);
        })

        it("should be called with the right parameters", async () => {
            mockService.findOne.mockResolvedValue(product);

            await controller.findOne(mockProductId);

            expect(mockService.findOne).toHaveBeenCalledWith(mockProductId);
        })



    })

    //CREATE CONTROLLER
    describe("create", () => {
        const productDto = {
            title: "a title ", description: "a description", price: 100.50, categoryId: "abc123"
        }
        const mockCreatedProduct = { id: "productId", ...productDto }

        it("should be defined", () => {
            expect(controller.create).toBeDefined();
        })

        it("should be called once", async () => {
            mockService.create.mockResolvedValue(mockCreatedProduct);

            await controller.create(productDto, productDto.categoryId);

            expect(mockService.create).toHaveBeenCalledTimes(1);
        })

        it("should be called with the right parameters", async () => {
            mockService.create.mockResolvedValue(mockCreatedProduct);

            await controller.create(productDto, productDto.categoryId);

            expect(mockService.create).toHaveBeenCalledWith(productDto);
        })
    })

    //UPDATE CONTROLLER
    describe("update", () => {
        const product = {
            id: "abc123", title: "a title ", description: "a description", price: 100.50, categoryId: "abc123"
        }
        const productId = "abc123";
        const data = { title: "new title" };

        // beforeEach(() => {
        //     mockService.findOne.mockResolvedValue(product);
        //     mockService.update.mockResolvedValue({ ...product, ...data });
        // })


        it('should throw NotFoundException if product is not found', async () => {
            mockService.findOne.mockResolvedValueOnce(null);

            await expect(controller.update(productId, product)).rejects.toThrow(NotFoundException);
        });

        it("should be defined", () => {
            expect(controller.update).toBeDefined();
        })

        it("should be called once", async () => {
            // mockService.findOne.mockResolvedValueOnce(null);

            mockService.update.mockResolvedValue({ ...product, ...data });

            await controller.update(productId, product);

            expect(mockService.update).toHaveBeenCalledTimes(1);
        })

        it("should be called with the right parameters", async () => {

            const result = await controller.update(productId, product);

            expect(mockService.update).toHaveBeenCalledWith(productId, product);
        })
    })

    //REMOVE CONTROLLER
    describe("remove", () => {
        const product = {
            id: "abc123", title: "a title "
        }

        it("should be defined", () => {
            expect(controller.remove).toBeDefined();
        })

        it("should be called once", async () => {
            mockService.findOne.mockResolvedValue(product);
            mockService.remove.mockResolvedValue(product);

            await controller.remove(product.id);

            expect(mockService.remove).toHaveBeenCalledTimes(1);
        })

        it("should be called with the right parameters", async () => {
            mockService.remove.mockResolvedValue(product);

            await controller.remove(product.id);

            expect(mockService.remove).toHaveBeenCalledWith(product.id);
        })
    })
});
