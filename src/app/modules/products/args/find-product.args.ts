import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class FindProductArgs {
  @Field(() => String)
  public readonly slug: string;
}
