import { Module } from '@nestjs/common'
import { join } from 'path'
import { GraphQLDirective, GraphQLSchema } from 'graphql/type'
import { DirectiveLocation } from 'graphql/language'
import { upperDirectiveTransformer } from './common/directives/upper-case.directive'
import { DatasourceModule } from '../business-logic/datasource/datasource.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

@Module({
  imports: [
    DatasourceModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '../../schema.gql'),
      sortSchema: true,
      transformSchema: (schema: GraphQLSchema) =>
        upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
})
export class GraphqlModule {}
