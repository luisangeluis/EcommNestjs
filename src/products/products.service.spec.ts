import { PrismaService } from "src/prisma/prisma.service";
import { ProductsService } from "./products.service";
import { Test } from '@nestjs/testing';
import { NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";


describe("ProductsService", () => {
    const mockPrisma = {
        product: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        }
    };
    let service: ProductsService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProductsService,
                { provide: PrismaService, useValue: mockPrisma }
            ]
        }).compile();

        service = module.get(ProductsService);

        jest.clearAllMocks();
    })

    it('should have the service defined', () => {
        expect(service).toBeDefined();
    });

    describe("findAll", () => {
        it("should be defined", () => {
            expect(service.findAll).toBeDefined();
        })

        it("should calle one time findAll once", () => {
            service.findAll();
            expect(mockPrisma.product.findMany).toHaveBeenCalledTimes(1);
        })
    })

    describe("findOne", () => {
        const mockProduct = { id: 'abc123', title: 'mock Product' }
        mockPrisma.product.findUnique.mockResolvedValue(mockProduct);

        it("should be defined", () => {
            expect(service.findOne).toBeDefined();
        })

        it("should be called once", async () => {
            await service.findOne("abc123");

            expect(mockPrisma.product.findUnique).toHaveBeenCalledTimes(1);
        })

        it("should be called with right arguments", async () => {
            await service.findOne("abc123");

            expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 'abc123' } });
        })
    })

    describe("create", () => {
        const data: CreateProductDto = {
            title: "a product",
            description: "a product description",
            price: 10,
            categoryId: "categoryId"
        }

        it("should be defined", () => {
            expect(service.create).toBeDefined();
        })

        it("should be called once", async () => {

            await service.create(data);

            expect(mockPrisma.product.create).toHaveBeenCalledTimes(1);
        })

        it("should be called with right arguments", async () => {
            await service.create(data);

            expect(mockPrisma.product.create).toHaveBeenCalledWith({ data });
        })
    })

    // //FIND ALL PRODUCTS
    // it("FindMany should be return all products", async () => {
    //     const products = [{ id: '1', name: 'Product A' }];

    //     mockPrisma.product.findMany.mockResolvedValue(products);

    //     const result = await service.findAll();

    //     expect(result).toEqual(products);
    //     expect(mockPrisma.product.findMany).toHaveBeenCalled();
    // })

    // //FIND A PRODUCT BY ID
    // it("FindUnique should return a product", async () => {
    //     const mockProduct = { id: '1', name: 'Test Product' };

    //     mockPrisma.product.findUnique.mockResolvedValue(mockProduct);

    //     const result = await service.findOne("1");

    //     expect(result).toEqual(mockProduct);
    //     expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    // })

    // //THROW AN EXCEPTION WHEN PRODUCT ID DOES NOT EXIST
    // it("FindOne should throw NotFoundException if product not found", async () => {
    //     mockPrisma.product.findUnique.mockResolvedValue(null);

    //     await expect(service.findOne('fakeId')).rejects.toThrow(NotFoundException);
    // })

    // //CREATE A PRODUCT
    // it("Should be create a product", async () => {
    //     const dto: CreateProductDto = {
    //         title: "a product",
    //         description: "a product description",
    //         price: 10,
    //         categoryId: "categoryId"
    //     }
    //     const expectedResult = { id: "abc", ...dto }
    //     mockPrisma.product.create.mockResolvedValue(expectedResult);

    //     const result = await service.create(dto);

    //     expect(result).toEqual(expectedResult);
    //     expect(mockPrisma.product.create).toHaveBeenCalledWith({ data: dto });
    // })

    // //UPDATE A PRODUCT
    // it("should be update a product", async () => {
    //     const id = "myId"
    //     const dto: UpdateProductDto = {
    //         title: "new title"
    //     }

    //     mockPrisma.product.findUnique.mockResolvedValue({ id, title: "old title" });
    //     mockPrisma.product.update.mockResolvedValue({ id, ...dto });

    //     const result = await service.update(id, dto);

    //     expect(result).toEqual({ id, ...dto });
    //     expect(mockPrisma.product.update).toHaveBeenCalledWith({ where: { id }, data: dto });
    // })

    // //DELETE A PRODUCT
    // it("should be delete a product", async () => {
    //     const id = "fakeId";
    //     const product = { id: "fakeId", title: "title" };

    //     mockPrisma.product.findUnique.mockResolvedValue(product);
    //     mockPrisma.product.delete.mockResolvedValue(product);

    //     const result = await service.remove(id);

    //     expect(result).toEqual(product);
    //     expect(mockPrisma.product.delete).toHaveBeenCalledWith({ where: { id } });

    // })



})