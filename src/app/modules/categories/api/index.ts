import { Inject, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindCategoryBySlugQuery } from '../queries';

@Injectable()
export class CategoriesAPI {
  @Inject()
  private queryBus: QueryBus;

  public findCategoryBySlug(
    slug: string,
  ): Promise<FindCategoryBySlugQuery.Output> {
    return this.queryBus.execute(new FindCategoryBySlugQuery(slug));
  }
}