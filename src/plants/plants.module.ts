import { Module } from '@nestjs/common';
import { OwnersModule } from '../owners/owners.module';
import { CatOwnerResolver } from './cat-owner.resolver';
import { PlantsResolver } from './plants.resolver';
import { PlantsService } from './plants.service';

@Module({
  imports: [OwnersModule],
  providers: [PlantsService, PlantsResolver, CatOwnerResolver],
})
export class PlantsModule {}
