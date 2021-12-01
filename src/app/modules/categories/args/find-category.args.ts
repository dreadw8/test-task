import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class FindCategoryArgs {
  @Field(() => String)
  public readonly slug: string;
}
