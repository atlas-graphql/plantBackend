import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PlantsGuard } from './plants.guard';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver('Plant')
export class PlantsResolver {
  constructor(private readonly catsService: PlantsService) {}

  @Query('plants')
  @UseGuards(PlantsGuard)
  async getCats() {
    return this.catsService.findAll();
  }

  @Query('plant')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<Plant> {
    return this.catsService.findOneById(id);
  }

  @Mutation('createPlant')
  async create(@Args('createPlantInput') args: CreatePlantDto): Promise<Plant> {
    const createdCat = await this.catsService.create(args);
    pubSub.publish('catCreated', { catCreated: createdCat });
    return createdCat;
  }

  @Subscription('catCreated')
  catCreated() {
    return pubSub.asyncIterator('catCreated');
  }
}
