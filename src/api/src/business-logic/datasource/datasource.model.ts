import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ inheritDescription: true })
// This is the GraphQL representation of the Datasource Business Logic
export class DatasourceModel {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  /*  @Field()
  type: DatasourceType | null*/

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Date)
  deletedAt: Date
}
