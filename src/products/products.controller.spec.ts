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
    });

    //FINDALL CONTROLLERS
    describe("findAll", () => {
        it("should be defined", () => {
            expect(controller.findAll).toBeDefined();
        })

        it("should be called once", async () => {
            await controller.findAll();

            expect(mockService.findAll).toHaveBeenCalledTimes(1);
        })
    })

    // it('findALL should be return all products', async () => {
    //     const items = [{ id: '1', name: 'Producto' }];
    //     mockService.findAll.mockResolvedValue(items);

    //     const result = await controller.findAll();
    //     expect(result).toEqual(items);
    //     expect(service.findAll).toHaveBeenCalled();
    // });

    // it('findOne should be return a product', async () => {
    //     const item = { id: '42', name: 'Algo' };
    //     mockService.findOne.mockResolvedValue(item);

    //     const result = await controller.findOne('42');
    //     expect(result).toEqual(item);
    //     expect(service.findOne).toHaveBeenCalledWith('42');
    // });

    // it('create should return a message with the productId created', async () => {
    //     const dto: CreateProductDto = {
    //         title: 'Zapato',
    //         description: 'Cómodo',
    //         price: 80,
    //         categoryId: 'cat-123',
    //     };
    //     // simulamos el retorno del service (incluye id)
    //     mockService.create.mockResolvedValue({ id: 'xyz-789', ...dto });

    //     const res = await controller.create(dto, dto.categoryId);
    //     expect(service.create).toHaveBeenCalledWith(dto);
    //     expect(res).toEqual({
    //         message: 'Product with id: xyz-789 successfully created',
    //     });
    // });

    // it('update should return a message with the productId updated', async () => {
    //     const dto: UpdateProductDto = { title: 'Nuevo nombre' };
    //     mockService.update.mockResolvedValue(undefined);

    //     const res = await controller.update('abc123', dto);
    //     expect(service.update).toHaveBeenCalledWith('abc123', dto);
    //     expect(res).toEqual({
    //         message: 'Product with id: abc123 successfully updated',
    //     });
    // });

    // it('remove → debería delegar en service.remove y devolver su resultado', async () => {
    //     mockService.remove.mockResolvedValue(undefined);
    //     const res = await controller.remove('abc123');
    //     expect(service.remove).toHaveBeenCalledWith('abc123');
    //     expect(res).toBe(undefined);
    // });
});
