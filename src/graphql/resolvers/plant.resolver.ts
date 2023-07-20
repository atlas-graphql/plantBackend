import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PlantService } from '../../services/plant.service'
import { CreatePlantInput } from '../input/create-plant.input'
import { Plant } from '../../entities/plant.entity'

@Resolver(() => Plant)
export class PlantResolver {
  constructor(private readonly plantsService: PlantService) {}

  @Query(() => [Plant], { name: 'getPlants' })
  getPlants() {
    return this.plantsService.findAll()
  }

  @Query(() => Number, { name: 'getPlantsTotal' })
  getTotalPlants() {
    return this.plantsService.findAllTotal()
  }

  @Query(() => Number, { name: 'getUnboughtPlantsCount' })
  getUnboughtPlantsCount() {
    return this.plantsService.findAllUnboughtPlants()
  }

  @Query(() => Plant, { name: 'getPlant', nullable: true })
  async findOneById(
    @Args('id', ParseUUIDPipe)
    id: string,
  ): Promise<Plant | null> {
    return this.plantsService.findOneById(id)
  }

  @Mutation(() => Boolean, { name: 'deletePlant' })
  async delete(
    @Args('id', ParseUUIDPipe)
    id: string,
  ): Promise<Plant> {
    return this.plantsService.delete(id)
  }

  @Mutation(() => Plant, { name: 'updatePlant' })
  async update(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('updatePlantInput') args: CreatePlantInput,
  ): Promise<Plant | null> {
    return await this.plantsService.update(id, args)
  }

  @Mutation(() => Plant, { name: 'createPlant' })
  async create(
    @Args('createPlantInput') args: CreatePlantInput,
  ): Promise<Plant> {
    return await this.plantsService.create(args)
  }
}
