import { Injectable } from '@nestjs/common';
import { Plant } from '../graphql.schema';

@Injectable()
export class PlantsService {
  private readonly plants: Array<Plant & { ownerId?: number }> = [
    { id: 1, name: 'Plant', age: 5, ownerId: 1 },
  ];

  create(plant: Plant): Plant {
    plant.id = this.plants.length + 1;
    this.plants.push(plant);
    return plant;
  }

  findAll(): Plant[] {
    return this.plants;
  }

  findOneById(id: number): Plant | undefined {
    return this.plants.find((plant) => plant.id === id);
  }
}
