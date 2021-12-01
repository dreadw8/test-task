import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { UserEntity } from './entity';
import { UserResolver } from './resolvers';
import { CreateUserCommandHandler } from './commands';
import { FindUserByNameQueryHandler, FindUserByIdQueryHandler, GetUserProductsQueryHandler } from './queries';
import { UsersAPI } from './api';
import { LoginController } from './controllers';

@Module({
  imports: [
    CqrsModule,

    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    LoginController,

    CreateUserCommandHandler,

    FindUserByNameQueryHandler,
    FindUserByIdQueryHandler,
    GetUserProductsQueryHandler,

    UserResolver,

    UsersAPI,
  ],
  exports: [UsersAPI]
})

export class UsersModule {}
