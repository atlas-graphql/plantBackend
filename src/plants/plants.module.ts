import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsResolver } from './resolvers/plants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './entities/plant.entity';
import { PlantSeederService } from '../database/seeders/plant/plant-seeder.service';
import { SeedService } from '../database/seeders/SeedService';

@Module({
  imports: [TypeOrmModule.forFeature([Plant])],
  providers: [PlantsService, PlantsResolver, SeedService, PlantSeederService],
})
export class PlantsModule {}
