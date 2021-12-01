import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '../entity';

export namespace FindProductBySlugQuery {
  export type Output = Maybe<ProductEntity>;
}

export class FindProductBySlugQuery {
  constructor(
    public slug: string,
  ) { }
}

@QueryHandler(FindProductBySlugQuery)
export class FindProductBySlugQueryHandler implements IQueryHandler<FindProductBySlugQuery> {
  @InjectRepository(ProductEntity)
  private readonly repository: Repository<ProductEntity>;

  public async execute(
    { slug }: FindProductBySlugQuery,
  ): Promise<FindProductBySlugQuery.Output> {
    return this.repository.findOne({ slug });
  }
}