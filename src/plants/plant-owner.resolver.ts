import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Plant, Owner } from '../graphql.schema';
import { OwnersService } from '../owners/owners.service';

@Resolver('Plant')
export class PlantOwnerResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @ResolveField()
  async owner(
    @Parent() plant: Plant & { ownerId: number },
  ): Promise<Owner | undefined> {
    return this.ownersService.findOneById(plant.ownerId);
  }
}
