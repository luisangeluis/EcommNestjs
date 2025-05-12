import { PrismaService } from "src/prisma/prisma.service";
import { ProductsService } from "./products.service";
import { Test } from '@nestjs/testing';
import { NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

const mockPrisma = {
    product: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe("ProductsService", () => {
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

    //FIND ALL PRODUCTS
    it("FindMany should be return all products", async () => {
        const products = [{ id: '1', name: 'Product A' }];

        mockPrisma.product.findMany.mockResolvedValue(products);

        expect(await service.findAll()).toEqual(products);
        expect(mockPrisma.product.findMany).toHaveBeenCalled();
    })

    //FIND A PRODUCT BY ID
    it("FindUnique should return a product", async () => {
        const mockProduct = { id: '1', name: 'Test Product' };

        mockPrisma.product.findUnique.mockResolvedValue(mockProduct);

        const product = await service.findOne("1");

        expect(product).toEqual(mockProduct);
        expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    })

    //THROW AN EXCEPTION WHEN PRODUCT ID DOES NOT EXIST
    it("FindOne should throw NotFoundException if product not found", async () => {
        mockPrisma.product.findUnique.mockResolvedValue(null);

        await expect(service.findOne('fakeId')).rejects.toThrow(NotFoundException);
    })

    //CREATE A PRODUCT
    it("Should be create a product", async () => {
        const dto: CreateProductDto = {
            title: "a product",
            description: "a product description",
            price: 10,
            categoryId: "categoryId"
        }
        const expectedResult = { id: "abc", ...dto }
        mockPrisma.product.create.mockResolvedValue(expectedResult);

        const result = await service.create(dto);

        expect(result).toEqual(expectedResult);
        expect(mockPrisma.product.create).toHaveBeenCalledWith({ data: dto });
    })

    //UPDATE A PRODUCT
    it("should be update a product", async () => {
        const id = "myId"
        const dto: UpdateProductDto = {
            title: "new title"
        }

        mockPrisma.product.findUnique.mockResolvedValue({ id, title: "old title" });
        mockPrisma.product.update.mockResolvedValue({ id, ...dto });

        const result = await service.update(id, dto);

        expect(result).toEqual({ id, ...dto });
        expect(mockPrisma.product.update).toHaveBeenCalledWith({ where: { id }, data: dto });
    })



})