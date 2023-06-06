import { Min } from 'class-validator';
import { CreatePlantInput } from '../../graphql.schema';

export class CreatePlantDto extends CreatePlantInput {
  @Min(1)
  age: number;
}
