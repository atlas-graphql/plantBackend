import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from '../database/seeders/SeedService';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = await app.get(SeedService);
  await seedService.clearSeed();
  await seedService.seed();

  await app.close();

  console.log('Seed complete.');
}

bootstrap();
