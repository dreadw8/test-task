import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from '../entity';

export namespace FindCategoryBySlugQuery {
  export type Output = Maybe<CategoryEntity>;
}

export class FindCategoryBySlugQuery {
  constructor(
    public slug: string,
  ) { }
}

@QueryHandler(FindCategoryBySlugQuery)
export class FindCategoryBySlugQueryHandler implements IQueryHandler<FindCategoryBySlugQuery> {
  @InjectRepository(CategoryEntity)
  private readonly repository: Repository<CategoryEntity>;

  public async execute(
    { slug }: FindCategoryBySlugQuery,
  ): Promise<FindCategoryBySlugQuery.Output> {
    return this.repository.findOne({ slug });
  }
}