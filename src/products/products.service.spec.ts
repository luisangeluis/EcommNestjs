import { PrismaService } from "src/prisma/prisma.service";
import { ProductsService } from "./products.service";
import { Test } from '@nestjs/testing';

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

    it("Should be return all products", async () => {
        const products = [{ id: '1', name: 'Product A' }];

        mockPrisma.product.findMany.mockResolvedValue(products);

        expect(await service.findAll()).toEqual(products);
        expect(mockPrisma.product.findMany).toHaveBeenCalled();
    })
})