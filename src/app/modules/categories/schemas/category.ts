import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryEntity } from '../entity/category.entity';
import { plainToClass } from 'class-transformer';

@ObjectType('Category')
export class CategorySchema {
    public id: string;

    @Field(() => String)
    public name: string;

    public static fromModel(value: CategoryEntity) {
        return plainToClass(this, value);
    }
}