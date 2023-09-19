import { DatasourceModel } from './datasource.model'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { DatasourceService } from './datasource.service'
import { ParseUUIDPipe } from '@nestjs/common'

@Resolver(() => DatasourceModel)
export class DatasourceResolver {
  constructor(private readonly datasourceService: DatasourceService) {}

  @Query(() => [DatasourceModel], { name: 'getDatasources' })
  getDatasources() {
    return this.datasourceService.findAll()
  }

  @Query(() => DatasourceModel, { name: 'getDatasource', nullable: true })
  async findOneById(
    @Args('id', ParseUUIDPipe)
    id: string,
  ): Promise<DatasourceModel | null> {
    return this.datasourceService.find(id)
  }
}
