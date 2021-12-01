import { CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FindUserByIdQuery } from '../../users';
import { extractSession } from '../decrators';

@Injectable()
export class UserGuard implements CanActivate {
  @Inject()
  private readonly queryBus: QueryBus;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const session = extractSession(ctx);

    if (!session) {
      return false;
    }

    return !!(await this.queryBus.execute(new FindUserByIdQuery(session.id)));
  }
}
