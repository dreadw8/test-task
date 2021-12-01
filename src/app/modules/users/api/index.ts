import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';

import { CreateUserCommand } from '../commands';
import { FindUserByIdQuery, GetUserProductsQuery } from '../queries';
import { LoginController } from '../controllers';

@Injectable()
export class UsersAPI {
  @Inject()
  private commandBus: CommandBus;

  @Inject()
  private queryBus: QueryBus;

  @Inject()
  private readonly moduleRef: ModuleRef;

  public createUser(
    data: CreateUserCommand.Data,
  ): Promise<CreateUserCommand.Output> {
    return this.commandBus.execute(new CreateUserCommand(data));
  }

  public async login(data: LoginController.Data): Promise<LoginController.Output> {
    const controller = this.moduleRef.get(LoginController);

    return controller.execute(data);
  }

  public async findUserById(userId: number): Promise<FindUserByIdQuery.Output> {
    return this.queryBus.execute(new FindUserByIdQuery(userId));
  }

  public async getUserProducts(userId: number): Promise<GetUserProductsQuery.Output> {
    return this.queryBus.execute(new GetUserProductsQuery(userId));
  }
}