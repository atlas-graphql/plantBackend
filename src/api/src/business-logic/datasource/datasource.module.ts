import { Module } from '@nestjs/common'
import { DatasourceService } from './datasource.service'
import { DatasourceResolver } from './datasource.resolver'
import { DatasourceEntity } from '../../database/entities/datasource.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

// This is considered our entry point for the Datasource Business Logic
@Module({
  imports: [TypeOrmModule.forFeature([DatasourceEntity])],
  providers: [DatasourceResolver, DatasourceService],
})
export class DatasourceModule {}
