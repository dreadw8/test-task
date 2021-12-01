import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { CategoryEntity } from './entity';
import { FindCategoryBySlugQueryHandler } from './queries';
import { CategoryResolver } from './resolvers';
import { CategoriesAPI } from './api';

@Module({
  imports: [
    CqrsModule,

    TypeOrmModule.forFeature([CategoryEntity]),
  ],
  providers: [
    CategoryResolver,

    FindCategoryBySlugQueryHandler,

    CategoriesAPI,
  ],
  exports: [CategoriesAPI]
})

export class CategoriesModule {}
