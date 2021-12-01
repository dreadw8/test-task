import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entity';

export namespace FindUserByIdQuery {
  export type Output = Maybe<UserEntity>;
}

export class FindUserByIdQuery {
  constructor(
    public id: number,
  ) { }
}

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler implements IQueryHandler<FindUserByIdQuery> {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  public async execute(
    { id }: FindUserByIdQuery,
  ): Promise<FindUserByIdQuery.Output> {
    return this.repository.findOne(id);
  }
}