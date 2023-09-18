import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, Length, MaxLength } from 'class-validator'

@InputType()
export class CreateDatasourceInput {
  @Field()
  @MaxLength(30)
  name: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  picture?: string

  @Field({ nullable: true })
  @IsOptional()
  boughtAt?: Date

  @Field({ nullable: true })
  @IsOptional()
  deceasedAt?: Date
}
