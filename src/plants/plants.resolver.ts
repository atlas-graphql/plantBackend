import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { PubSub } from 'graphql-subscriptions';
import { Plant } from '../graphql.schema';

const pubSub = new PubSub();
@Resolver('Plant')
export class PlantsResolver {
  constructor(private readonly plantsService: PlantsService) {}

  @Query('plants')
  async getCats() {
    return this.plantsService.findAll();
  }

  @Query('plant')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<Plant | undefined> {
    return this.plantsService.findOneById(id);
  }

  @Mutation('createPlant')
  async create(@Args('createPlantInput') args: CreatePlantDto): Promise<Plant> {
    const createdPlant = await this.plantsService.create(args);
    pubSub.publish('plantCreated', { plantCreated: createdPlant });
    return createdPlant;
  }

  @Subscription('plantCreated')
  plantCreated() {
    return pubSub.asyncIterator('plantCreated');
  }
}
