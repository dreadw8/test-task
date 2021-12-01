import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('AuthToken')
export class AuthTokenSchema {
    @Field(() => String)
    public authToken: string;
}
