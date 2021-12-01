import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '../entity';

export namespace AddProductToUserCommand {
  export type Data = ProductEntity;
  export type Output = void;
}

export class AddProductToUserCommand {
  constructor(
    public readonly data: AddProductToUserCommand.Data,
  ) { }
}

@CommandHandler(AddProductToUserCommand)
export class AddProductToUserCommandHandler implements ICommandHandler<AddProductToUserCommand> {
  @InjectRepository(ProductEntity)
  private readonly repository: Repository<ProductEntity>;

  public async execute(
    { data }: AddProductToUserCommand,
  ): Promise<AddProductToUserCommand.Output> {
    await this.repository.save(data);
  }
}