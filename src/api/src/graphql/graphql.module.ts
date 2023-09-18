import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

import { GraphQLDirective } from 'graphql/type'
import { DirectiveLocation } from 'graphql/language'
import { upperDirectiveTransformer } from './common/directives/upper-case.directive'
import { DatasourceModule } from '../entities/datasource/datasource.module'

@Module({
  imports: [
    DatasourceModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
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
