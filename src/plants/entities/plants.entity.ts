import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PlantsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  picture?: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  boughtAt?: Date;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  deceasedAt?: Date;
}
