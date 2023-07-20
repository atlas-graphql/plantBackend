import { Module } from '@nestjs/common'
import { PlantService } from '../services/plant.service'
import { PlantResolver } from '../graphql/resolvers/plant.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Plant } from '../entities/plant.entity'
import { PlantSeederService } from '../database/seeders/plant/plant-seeder.service'
import { SeedService } from '../database/seeders/SeedService'

@Module({
  imports: [TypeOrmModule.forFeature([Plant])],
  providers: [PlantService, PlantResolver, SeedService, PlantSeederService],
})
export class PlantModule {}
