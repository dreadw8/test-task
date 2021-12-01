import { Inject, Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';

import { AddProductToUserCommand } from '../commands';
import { FindProductBySlugQuery } from '../queries';
import { FindUserByIdQuery } from '../../users';

export namespace AddProductToUserController {
  export type Output = void;
}

@Injectable()
export class AddProductToUserController {
  @Inject()
  private readonly queryBus: QueryBus;

  @Inject()
  private readonly commandBus: CommandBus;

  public async execute(
    userId: number,
    productSlug: string,
  ): Promise<AddProductToUserController.Output> {
    const user = await this.queryBus.execute(new FindUserByIdQuery(userId)) as FindUserByIdQuery.Output;

    if (!user) {
      throw new Error('User is not found');
    }

    const product = await this.queryBus.execute(new FindProductBySlugQuery(productSlug)) as FindProductBySlugQuery.Output;

    if (!product) {
      throw new Error('Product is not found');
    }

    await this.commandBus.execute(new AddProductToUserCommand({ ...product, users: [user] } ));
  }w
}