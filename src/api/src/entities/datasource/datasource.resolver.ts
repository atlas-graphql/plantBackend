import { Datasource } from './datasource'
import { Query, Resolver } from '@nestjs/graphql'
import { DatasourceService } from './datasource.service'

@Resolver(() => Datasource)
export class DatasourceResolver {
  constructor(private readonly datasourceService: DatasourceService) {}

  @Query(() => [Datasource], { name: 'getDatasources' })
  getDatasources() {
    return this.datasourceService.findAll()
  }
}
