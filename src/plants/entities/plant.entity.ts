import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({
  name: 'plants',
})
export class Plant {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  picture?: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  @Field(() => Date)
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  boughtAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  deceasedAt?: Date;
}
