import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductEntity } from './entity';
import { ProductResolver } from './resolvers';
import { FindProductBySlugQueryHandler, FindProductsByCategoryIdQueryHandler } from './queries';
import { AddProductToUserCommandHandler } from './commands';
import { ProductsAPI } from './api';
import { AddProductToUserController } from './controllers';

@Module({
  imports: [
    CqrsModule,

    TypeOrmModule.forFeature([ProductEntity]),
  ],
  providers: [
    ProductResolver,

    FindProductBySlugQueryHandler,
    FindProductsByCategoryIdQueryHandler,

    AddProductToUserCommandHandler,

    AddProductToUserController,

    ProductsAPI,
  ],
  exports: [ProductsAPI]
})

export class ProductsModule {}
