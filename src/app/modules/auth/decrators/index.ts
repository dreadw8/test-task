import { GqlExecutionContext } from '@nestjs/graphql';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserSession {
  readonly id: number;
  readonly name: string;
}

export function extractSession<T extends UserSession>(ctx: ExecutionContext): T | undefined {
  const { session } = ctx.switchToHttp().getRequest() ?? GqlExecutionContext.create(ctx).getContext().request;

  return session;
}

export const Session = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return extractSession(ctx);
  },
);
