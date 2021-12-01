import { ArgsType, Field } from "@nestjs/graphql";
import { MinLength, MaxLength } from 'class-validator';

@ArgsType()
export class CreateUserArgs {
  @Field(() => String)
  @MinLength(3)
  @MaxLength(20)
  public readonly name: string;

  @Field(() => String)
  @MinLength(5)
  @MaxLength(20)
  public readonly password: string;
}
