import { ParseUUIDPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PlantsService } from '../plants.service';
import { CreatePlantInput } from '../inputs/create-plant.input';
import { PubSub } from 'graphql-subscriptions';
import { Plant } from '../models/plant.model';

const pubSub = new PubSub();
@Resolver(() => Plant)
export class PlantsResolver {
  constructor(private readonly plantsService: PlantsService) {}

  @Query(() => [Plant], { name: 'getPlants' })
  async getPlants() {
    return this.plantsService.findAll();
  }

  @Query(() => Plant, { name: 'getPlant', nullable: true })
  async findOneById(
    @Args('id', ParseUUIDPipe)
    id: string,
  ): Promise<Plant | null> {
    return this.plantsService.findOneById(id);
  }

  @Mutation(() => Plant, { name: 'createPlant' })
  async create(
    @Args('createPlantInput') args: CreatePlantInput,
  ): Promise<Plant> {
    const createdPlant = await this.plantsService.create(args);
    await pubSub.publish('plantCreated', { plantCreated: createdPlant });
    return createdPlant;
  }

  @Subscription(() => Plant, { name: 'plantCreated' })
  plantCreated() {
    return pubSub.asyncIterator('plantCreated');
  }
}
