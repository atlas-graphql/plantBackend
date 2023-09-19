import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatasourceEntity } from '../../database/entities/datasource.entity'

@Injectable()
export class DatasourceService {
  constructor(
    @InjectRepository(DatasourceEntity)
    private readonly datasourceRepository: Repository<DatasourceEntity>,
  ) {}

  findAll(): Promise<DatasourceEntity[]> {
    return this.datasourceRepository.find()
  }

  create(newDatasourceData: DatasourceEntity): Promise<DatasourceEntity> {
    const newDatasource = this.datasourceRepository.create(newDatasourceData)
    return this.datasourceRepository.save(newDatasource)
  }

  find(id: string): Promise<DatasourceEntity | null> {
    return this.datasourceRepository.findOne({
      where: { id },
    })
  }
}
