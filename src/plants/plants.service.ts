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

  async create(newPlantData: CreatePlantInput): Promise<PlantsEntity> {
    const newPlant = await this.plantRepository.create(newPlantData);
    return this.plantRepository.save(newPlant);
  }

  async findAll(): Promise<PlantsEntity[]> {
    return this.plantRepository.find();
  }

  async findOneById(id: string): Promise<PlantsEntity | null> {
    return this.plantRepository.findOne({
      where: { id },
    });
  }
}
