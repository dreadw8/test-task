import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProductSchema } from '../schemas';
import { FindProductArgs, AddProductArgs } from '../args';
import { ProductsAPI } from '../api';
import { GraphQLRequestValidator } from '../../../shared';
import { Session, UserSession } from '../../auth/decrators';
import { UserGuard } from '../../auth/guards';

@Resolver('Product')
export class ProductResolver {
  @Inject()
  private readonly productsAPI: ProductsAPI;
  
  @Inject()
  private readonly queryBus: QueryBus;

  @Query(() => ProductSchema)
  async findProduct(
    @Args(GraphQLRequestValidator) { slug }: FindProductArgs,
  ): Promise<ProductSchema> {
    const response = await this.productsAPI.findProductBySlug(slug);

    if (!response) {
      throw new Error('Product is not found');
    }

    return ProductSchema.fromModel(response);
  }

  @UseGuards(UserGuard)
  @Mutation(() => ProductSchema)
  async addProduct(
    @Session() session: UserSession,
    @Args('data', GraphQLRequestValidator) data: AddProductArgs,
  ): Promise<ProductSchema> {
    await this.productsAPI.addProductToUser(session.id, data.slug);
    const response = await this.productsAPI.findProductBySlug(data.slug);

    return ProductSchema.fromModel(response);
  }
}