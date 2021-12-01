import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as hash from 'password-hash';

import { UserEntity } from '../entity';

interface CreateUserData {
  name: string;
  password: string;
}

export namespace CreateUserCommand {
  export type Data = CreateUserData;
  export type Output = UserEntity;
}

export class CreateUserCommand {
  constructor(
    public readonly data: CreateUserCommand.Data,
  ) { }
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  public async execute(
    { data }: CreateUserCommand,
  ): Promise<CreateUserCommand.Output> {
    const { name, password } = data;
    const hashPassword =  hash.generate(password.trim());

    await this.repository.insert({ name, password: hashPassword })

    return this.repository.findOne({ name, password: hashPassword });
  }
}