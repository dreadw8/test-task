import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '../entity';

export namespace FindProductsByCategoryIdQuery {
  export type Output = Array<ProductEntity>;
}

export class FindProductsByCategoryIdQuery {
  constructor(
    public categoryId: string,
  ) { }
}

@QueryHandler(FindProductsByCategoryIdQuery)
export class FindProductsByCategoryIdQueryHandler implements IQueryHandler<FindProductsByCategoryIdQuery> {
  @InjectRepository(ProductEntity)
  private readonly repository: Repository<ProductEntity>;

  public async execute(
    { categoryId }: FindProductsByCategoryIdQuery,
  ): Promise<FindProductsByCategoryIdQuery.Output> {
    return this.repository.find({ categoryId });
  }
}