import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { QueryBus } from '@nestjs/cqrs';

import { FindProductBySlugQuery } from '../queries';
import { AddProductToUserController } from '../controllers';

@Injectable()
export class ProductsAPI {
  @Inject()
  private queryBus: QueryBus;

  @Inject()
  private readonly moduleRef: ModuleRef;

  public findProductBySlug(
    slug: string,
  ): Promise<FindProductBySlugQuery.Output> {
    return this.queryBus.execute(new FindProductBySlugQuery(slug));
  }

  public async addProductToUser(userId: number, productSlug: string): Promise<AddProductToUserController.Output> {
    const controller = this.moduleRef.get(AddProductToUserController);

    return controller.execute(userId, productSlug);
  }
}