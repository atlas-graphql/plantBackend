import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphqlModule } from './graphql/graphql.module';
import { PostgresProviderModule } from './database/PostgresProviderModule';

@Module({
  imports: [ConfigModule.forRoot(), PostgresProviderModule, GraphqlModule],
})
export class AppModule {}
