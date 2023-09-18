import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphqlModule } from './graphql/graphql.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, GraphqlModule],
})
export class AppModule {}
