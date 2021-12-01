import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entity';
import { ProductEntity } from '../../products';

export namespace GetUserProductsQuery {
  export type Output = Array<ProductEntity>;
}

export class GetUserProductsQuery {
  constructor(
    public id: number,
  ) { }
}

@QueryHandler(GetUserProductsQuery)
export class GetUserProductsQueryHandler implements IQueryHandler<GetUserProductsQuery> {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  public async execute(
    { id }: GetUserProductsQuery,
  ): Promise<GetUserProductsQuery.Output> {
    const { products } = await this.repository.findOne(id, { relations: ['products'] });
    
    return products;
  }
}