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

    const fakeProduct = { id: 'abc123', title: 'mock Product' }

    let service: ProductsService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProductsService,
                { provide: PrismaService, useValue: mockPrisma }
            ]
        }).compile();

        service = module.get(ProductsService);

        // jest.clearAllMocks();
        jest.resetAllMocks();

    })

    it('should have the service defined', () => {
        expect(service).toBeDefined();
    });

    //FINDALL SERVICE
    describe("findAll", () => {
        it("should be defined", () => {
            expect(service.findAll).toBeDefined();
        })

        it("should calle one time findAll once", () => {
            service.findAll();
            expect(mockPrisma.product.findMany).toHaveBeenCalledTimes(1);
        })
    })

    //FINDONE SERVICE
    describe("findOne", () => {

        it("should throw NotFoundException if product not found", async () => {
            mockPrisma.product.findUnique.mockResolvedValue(null);

            await expect(service.findOne("nonexistent")).rejects.toThrow(NotFoundException);
        });

        it("should be defined", () => {
            expect(service.findOne).toBeDefined();
        })

        it("should be called once", async () => {
            mockPrisma.product.findUnique.mockResolvedValue(fakeProduct);

            await service.findOne("abc123");

            expect(mockPrisma.product.findUnique).toHaveBeenCalledTimes(1);
        })

        it("should be called with right arguments", async () => {
            mockPrisma.product.findUnique.mockResolvedValue(fakeProduct);

            await service.findOne("abc123");

            expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 'abc123' } });
        })
    })

    //CREATE SERVICE
    describe("create", () => {
        const data: CreateProductDto = {
            title: "a product",
            description: "a product description",
            price: 10,
            categoryId: "categoryId"
        }

        const fakeId = "abc123";

        it("should return the created product", async () => {
            mockPrisma.product.create.mockResolvedValue({ data, id: fakeId });

            const result = await service.create(data);

            expect(result).toEqual({ data, id: fakeId });
        });


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

    //UPDATE SERVICE
    describe("update", () => {
        const mockId = "abc123";
        const data = { title: "new title" }

        it("should be defined", () => {
            expect(service.update).toBeDefined();
        })

        it("should be called once", async () => {
            mockPrisma.product.findUnique.mockResolvedValue(fakeProduct);
            mockPrisma.product.update.mockResolvedValue({ ...fakeProduct, ...data });

            await service.update(mockId, data);

            expect(mockPrisma.product.update).toHaveBeenCalledTimes(1);
        })


        it("should be called with right arguments", async () => {
            mockPrisma.product.findUnique.mockResolvedValue(fakeProduct);

            await service.update(mockId, data);

            expect(mockPrisma.product.update).toHaveBeenCalledWith({ where: { id: mockId }, data });
        })
    })

    //REMOVE SERVICE
    describe("remove", () => {
        const mockId = "abc123";

        it("should be defined", () => {
            expect(service.remove).toBeDefined();
        })

        it("should be called once", async () => {
            mockPrisma.product.findUnique.mockResolvedValue(fakeProduct);

            await service.remove(mockId);

            expect(mockPrisma.product.delete).toHaveBeenCalledTimes(1);
        })

        it("should be called with right arguments", async () => {
            mockPrisma.product.findUnique.mockResolvedValue(fakeProduct);

            await service.remove(mockId);

            expect(mockPrisma.product.delete).toHaveBeenCalledWith({ where: { id: mockId } });
        })
    })
})