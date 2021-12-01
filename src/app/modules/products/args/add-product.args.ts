import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddProductArgs {
  @Field(() => String)
  public readonly slug: string;
}
