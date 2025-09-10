import { TestingModule, Test } from '@nestjs/testing';
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  //Try mockData and modelDelegate
  const mockData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));
  const modelDelegate = {
    findMany: jest.fn(),
    count: jest.fn().mockResolvedValue(mockData.length),
  };

  let service: PaginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationService],
    }).compile();

    service = module.get<PaginationService>(PaginationService);
  });

  it('should be return the first page with limit 10 by default', async () => {
    const mockData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));
    // console.log(mockData);
    const modelDelegate = {
      findMany: jest.fn().mockResolvedValue(mockData.slice(0, 10)),
      count: jest.fn().mockResolvedValue(mockData.length),
    };

    const result = await service.paginate(modelDelegate, { where: {} });

    expect(result.items).toHaveLength(10);
    expect(result.meta.total).toBe(20);
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(10);
    expect(result.meta.totalPages).toBe(2);
  });

  it('should be return the first page with limit 15', async () => {
    const mockData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));
    // console.log(mockData);
    const modelDelegate = {
      findMany: jest.fn().mockResolvedValue(mockData.slice(0, 15)),
      count: jest.fn().mockResolvedValue(mockData.length),
    };

    const result = await service.paginate(
      modelDelegate,
      { where: {} },
      { limit: 15, page: 1 },
    );

    expect(result.items).toHaveLength(15);
    expect(result.meta.total).toBe(20);
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(15);
    expect(result.meta.totalPages).toBe(2);
  });

  it('shouldn´t return data when current page is larger than then number of pages', async () => {
    const mockData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));
    // console.log(mockData);
    const modelDelegate = {
      findMany: jest.fn().mockResolvedValue(mockData.slice(0, 0)),
      count: jest.fn().mockResolvedValue(mockData.length),
    };

    const result = await service.paginate(
      modelDelegate,
      { where: {} },
      { limit: 10, page: 3 },
    );

    console.log(result);

    expect(result.items).toHaveLength(0);
    expect(result.meta.total).toBe(20);
    expect(result.meta.limit).toBe(10);
    expect(result.meta.page).toBe(3);
    expect(result.meta.totalPages).toBe(2);
  });
});
