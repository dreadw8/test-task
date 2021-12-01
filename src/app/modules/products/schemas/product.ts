import { Field, ObjectType } from '@nestjs/graphql';
import { ProductEntity } from '../entity/product.entity';
import { plainToClass } from 'class-transformer';

@ObjectType('Product')
export class ProductSchema {
    @Field(() => String)
    public name: string;

    public static fromModel(value: ProductEntity) {
        return plainToClass(this, value);
    }
}