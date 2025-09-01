import { Injectable } from '@nestjs/common';

interface PaginationParams {
  page?: number;
  limit?: number;
}

@Injectable()
export class PaginationService {
  constructor() {}

  async paginate<T, A>(
    modelDelegate: {
      findMany: (args: A) => Promise<T[]>;
      count: (args?: any) => Promise<number>;
    },
    args: A & { where?: any },
    { page = 1, limit = 10 }: PaginationParams,
  ) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      modelDelegate.findMany({ ...args, skip, take: limit }),
      modelDelegate.count({ where: args.where }),
    ]);

    return {
      items: data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
