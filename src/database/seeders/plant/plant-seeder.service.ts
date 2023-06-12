import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plant } from '../../../plants/entities/plant.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class PlantSeederService {
  public constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
  ) {}

  public async clearSeed() {
    const allPlants = await this.plantRepository.find();
    await Promise.all(
      allPlants.map(async (plant) => {
        return await this.plantRepository.delete(plant.id);
      }),
    );
  }

  public async seed(seedCounter: number) {
    const isRandom = (date: Date) => (date.getTime() % 2 ? date : undefined);

    const seededData = await Promise.all(
      [...Array(seedCounter).keys()].map(async () => {
        const newPlant = this.plantRepository.create({
          name: faker.person.fullName(),
          picture: faker.image.url(),
          boughtAt: isRandom(faker.date.anytime()),
          deceasedAt: isRandom(faker.date.anytime()),
        });
        return await this.plantRepository.save(newPlant);
      }),
    );

    await console.log(`Generated ${seededData.length} new plants`);
  }
}
