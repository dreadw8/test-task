import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'

import { graphql } from '../../config';

import { UsersModule } from './users';
import { ProductsModule } from './products';
import { CategoriesModule } from './categories';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CategoriesModule,

    AuthModule,

    GraphQLModule.forRoot(graphql.settings),
  ],
  providers: []
})

export class GraphqlModule {
}