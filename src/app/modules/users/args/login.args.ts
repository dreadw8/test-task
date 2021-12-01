import { ArgsType, Field } from "@nestjs/graphql";
import { MinLength, MaxLength } from 'class-validator';

@ArgsType()
export class LoginArgs {
  @Field(() => String)
  @MinLength(3)
  @MaxLength(20)
  public readonly name: string;

  @Field(() => String)
  @MinLength(5)
  @MaxLength(20)
  public readonly password: string;
}
