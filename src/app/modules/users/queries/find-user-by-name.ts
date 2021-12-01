import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entity';

export namespace FindUserByNameQuery {
  export type Output = Maybe<UserEntity>;
}

export class FindUserByNameQuery {
  constructor(
    public name: string,
  ) { }
}

@QueryHandler(FindUserByNameQuery)
export class FindUserByNameQueryHandler implements IQueryHandler<FindUserByNameQuery> {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  public async execute(
    { name }: FindUserByNameQuery,
  ): Promise<FindUserByNameQuery.Output> {
    return this.repository.findOne({ name });
  }
}