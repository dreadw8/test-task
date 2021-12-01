import { GraphQLError } from 'graphql';

import { middleware } from '../app/shared'

export const settings = {
  port: 3000,
  host: 'localhost',
  debug: false,
  path: '/graphql',
  installSubscriptionHandlers: true,
  autoSchemaFile: true,
  playground: true,
  introspection: true,
  context: async ({ req }) => {
    await middleware.jwtTokenMiddleware(req);

    return { request: req };
  },
  formatError: (error: GraphQLError) => {
    console.error(error);

    return {
      errors: error.extensions || error.extensions?.exception.response?.extensions,
      message: error.message || error.extensions?.exception.response?.message,
    };
  },
}
