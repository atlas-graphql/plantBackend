import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ inheritDescription: true })
export class Datasource {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Date)
  deletedAt: Date
}
