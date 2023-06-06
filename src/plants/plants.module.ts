import { Module } from '@nestjs/common';
import { OwnersModule } from '../owners/owners.module';
import { PlantsResolver } from './plants.resolver';
import { PlantsService } from './plants.service';
import { PlantOwnerResolver } from './plant-owner.resolver';

@Module({
  imports: [OwnersModule],
  providers: [PlantsService, PlantsResolver, PlantOwnerResolver],
})
export class PlantsModule {}
