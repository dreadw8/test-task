import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphqlModule } from './modules/graphql.module';

import * as ORMConfig from '../config/orm';

@Module({
  imports: [
    GraphqlModule,
    TypeOrmModule.forRoot(ORMConfig),
  ],
})

export class ApplicationModule {
}