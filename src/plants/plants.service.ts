import { Injectable } from '@nestjs/common';
import { CreatePlantInput } from './inputs/create-plant.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantsEntity } from './entities/plants.entity';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(PlantsEntity)
    private readonly plantRepository: Repository<PlantsEntity>,
  ) {}

  create(newPlantData: CreatePlantInput): Promise<PlantsEntity> {
    const newPlant = this.plantRepository.create(newPlantData);
    return this.plantRepository.save(newPlant);
  }

  findAll(): Promise<PlantsEntity[]> {
    return this.plantRepository.find();
  }

  findOneById(id: string): Promise<PlantsEntity | null> {
    return this.plantRepository.findOne({
      where: { id },
    });
  }

  update(
    id: string,
    newPlantData: CreatePlantInput,
  ): Promise<PlantsEntity | null> {
    return this.plantRepository
      .findOneByOrFail({
        id,
      })
      .then((plant) => {
        const updatedPlant = this.plantRepository.create({
          ...plant,
          ...newPlantData,
        });
        return this.plantRepository.save(updatedPlant);
      })
      .catch(() => null);
  }

  async delete(id: string): Promise<boolean> {
    try {
      const plant = await this.plantRepository.findOne({
        where: { id },
      });
      if (plant) {
        await this.plantRepository.remove(plant);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
