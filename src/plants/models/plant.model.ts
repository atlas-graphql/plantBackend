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

  @Field({ nullable: true })
  boughtAt?: Date;

  @Field({ nullable: true })
  deceasedAt?: Date;
}
