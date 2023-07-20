import { Injectable } from '@nestjs/common'
import { CreatePlantInput } from '../graphql/input/create-plant.input'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Not, Repository } from 'typeorm'
import { Plant } from '../entities/plant.entity'

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
  ) {}

  create(newPlantData: CreatePlantInput): Promise<Plant> {
    const newPlant = this.plantRepository.create(newPlantData)
    return this.plantRepository.save(newPlant)
  }

  findAll(): Promise<Plant[]> {
    return this.plantRepository.find()
  }

  findAllTotal(): Promise<number> {
    return this.plantRepository.count()
  }

  findAllUnboughtPlants(): Promise<number> {
    return this.plantRepository.count({
      where: { boughtAt: IsNull(), createdAt: Not(IsNull()) },
    })
  }

  findOneById(id: string): Promise<Plant | null> {
    return this.plantRepository.findOne({
      where: { id },
    })
  }

  update(id: string, newPlantData: CreatePlantInput): Promise<Plant | null> {
    return this.plantRepository
      .findOneByOrFail({
        id,
      })
      .then(plant => {
        const updatedPlant = this.plantRepository.create({
          ...plant,
          ...newPlantData,
        })
        return this.plantRepository.save(updatedPlant)
      })
      .catch(() => null)
  }

  async delete(id: string) {
    const plant = await this.plantRepository.findOneByOrFail({
      id,
    })

    return await this.plantRepository.remove(plant)
  }
}
