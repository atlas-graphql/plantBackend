import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({
  name: 'datasource',
})
export class DatasourceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

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
