import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../entity';
import { plainToClass } from 'class-transformer';

@ObjectType('User')
export class UserSchema {
    public id: number;

    @Field(() => String)
    public name: string;

    public static fromModel(value: UserEntity) {
        return plainToClass(this, value);
    }
}