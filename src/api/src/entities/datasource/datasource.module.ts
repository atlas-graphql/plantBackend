import { Module } from '@nestjs/common'
import { DatasourceService } from './datasource.service'
import { DatasourceResolver } from './datasource.resolver'
import { DatasourceEntity } from '../../database/entities/datasource.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([DatasourceEntity])],
  providers: [DatasourceService, DatasourceResolver],
})
export class DatasourceModule {}
