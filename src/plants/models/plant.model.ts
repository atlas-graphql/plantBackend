import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'A plant ' })
export class Plant {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field({ nullable: true })
  picture?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  boughtAt?: Date;

  @Field(() => Date)
  deceasedAt?: Date;
}
