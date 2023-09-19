import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DatasourceType } from '../../business-logic/datasource/enums/datasourceType'

@Entity({
  name: 'datasource',
})
export class DatasourceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({
    type: 'enum',
    enum: DatasourceType,
    default: null,
  })
  type: DatasourceType

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  deletedAt: Date
}
