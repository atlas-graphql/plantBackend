import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsResolver } from './resolvers/plants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantsEntity } from './entities/plants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlantsEntity])],
  providers: [PlantsService, PlantsResolver],
})
export class PlantsModule {}
