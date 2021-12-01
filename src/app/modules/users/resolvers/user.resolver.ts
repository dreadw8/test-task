import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Inject, UseGuards} from '@nestjs/common';

import { GraphQLRequestValidator } from '../../../shared';
import { UserSchema, AuthTokenSchema } from '../schemas';
import { CreateUserArgs, LoginArgs } from '../args';
import { UsersAPI } from '../api';
import { UserGuard } from '../../auth/guards';
import { ProductSchema } from '../../products';
import { Session, UserSession } from '../../auth/decrators';

@Resolver(() => UserSchema)
export class UserResolver {
  @Inject()
  private readonly usersAPI: UsersAPI;

  @Query(() => AuthTokenSchema)
  async login(
    @Args(GraphQLRequestValidator) args: LoginArgs,
  ): Promise<AuthTokenSchema> {
    return this.usersAPI.login(args);
  }

  @Mutation(() => UserSchema)
  async createUser(
    @Args(GraphQLRequestValidator) args: CreateUserArgs,
  ): Promise<UserSchema> {
    const response = await this.usersAPI.createUser(args);

    return UserSchema.fromModel(response);
  }


  @UseGuards(UserGuard)
  @Query(() => UserSchema)
  async getProducts(
    @Session() session: UserSession,
  ): Promise<UserSchema> {
    const response = await this.usersAPI.findUserById(session.id);

    return UserSchema.fromModel(response);
  }

  @ResolveField('products', returns => [ProductSchema])
  async products(
    @Parent() user: UserSchema,
  ) {
    const { id } = user;
    return this.usersAPI.getUserProducts(id);
  }
}