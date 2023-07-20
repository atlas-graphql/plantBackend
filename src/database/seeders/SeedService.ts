import { Injectable } from '@nestjs/common'
import { PlantSeederService } from './plant/plant-seeder.service'

@Injectable()
export class SeedService {
  public constructor(private readonly plantSeederService: PlantSeederService) {}

  public async clearSeed() {
    await this.plantSeederService.clearSeed()
  }
  public async seed() {
    await this.plantSeederService.seed(100)
  }

  getHello(): string {
    return 'Hello world!'
  }
}
