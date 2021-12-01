import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GraphQLRequestValidator } from '../../../shared';
import { CategorySchema } from '../schemas';
import { FindCategoryArgs } from '../args';
import { CategoriesAPI } from '../api';
import { FindProductsByCategoryIdQuery, ProductSchema } from '../../products';

@Resolver(() => CategorySchema)
export class CategoryResolver {
  @Inject()
  private readonly categoriesAPI: CategoriesAPI;

  @Inject()
  private readonly queryBus: QueryBus;

  @Query(() => CategorySchema)
  async findCategory(
    @Args(GraphQLRequestValidator) { slug }: FindCategoryArgs,
  ): Promise<CategorySchema> {
    const response = await this.categoriesAPI.findCategoryBySlug(slug);

    if (!response) {
      throw new Error('Category is not found');
    }

    return CategorySchema.fromModel(response);
  }

  @ResolveField('products', returns => [ProductSchema])
  async products(
    @Parent() category: CategorySchema,
  ) {
    const { id } = category;
    return this.queryBus.execute(new FindProductsByCategoryIdQuery(id));
  }
}