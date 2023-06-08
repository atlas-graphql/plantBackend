import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PlantsService } from '../src/plants/plants.service';
import { AppModule } from '../src/app.module';
import { Plant } from '../src/plants/models/plant.model';
import { v4 } from 'uuid';

describe('PlantsResolver (e2e)', () => {
  let app: INestApplication;
  let plantsService: PlantsService;

  const createdAt = new Date('2023-01-01');
  const createdAtString = createdAt.toISOString();
  const graphqlEndPoint = '/graphql';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    plantsService = moduleFixture.get<PlantsService>(PlantsService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('getPlants', () => {
    it('should return an array of plants', async () => {
      const plants: Plant[] = [
        { id: '1', name: 'Plant 1', createdAt },
        { id: '2', name: 'Plant 2', createdAt },
      ];

      jest.spyOn(plantsService, 'findAll').mockResolvedValue(plants);

      const response = await request(app.getHttpServer())
        .post(graphqlEndPoint)
        .send({
          query: `
            {
              getPlants {
                  id
                  name
                  createdAt
              }
            }
          `,
        })
        .expect(200);

      expect(response.body.data.getPlants).toEqual([
        { id: '1', name: 'Plant 1', createdAt: createdAtString },
        { id: '2', name: 'Plant 2', createdAt: createdAtString },
      ]);
    });
  });

  describe('getPlant', () => {
    it('should return a plant by id', async () => {
      const id = v4();
      const plant: Plant = {
        id,
        name: 'Plant 1',
        createdAt,
      };

      jest.spyOn(plantsService, 'findOneById').mockResolvedValue(plant);

      const response = await request(app.getHttpServer())
        .post(graphqlEndPoint)
        .send({
          query: `
            { 
              getPlant(id: "${id}") {
                id
                name
                createdAt
              }  
            }
          `,
        })
        .expect(200);

      expect(response.body.data.getPlant).toEqual({
        id,
        name: 'Plant 1',
        createdAt: createdAtString,
      });
    });
  });

  describe('createPlant', () => {
    it('should create a new plant', async () => {
      const id = v4();
      const newPlant: Plant = {
        id,
        name: 'Plant 3',
        createdAt,
      };
      jest.spyOn(plantsService, 'create').mockResolvedValue(newPlant);

      const response = await request(app.getHttpServer())
        .post(graphqlEndPoint)
        .send({
          query: `
            mutation {
              createPlant(createPlantInput: {
                name: "Plant 3",
              }) {
                id
                name
                createdAt
              }
            }
          `,
        })
        .expect(200);

      expect(response.body.data.createPlant).toEqual({
        id,
        name: 'Plant 3',
        createdAt: createdAtString,
      });
    });
  });

  describe('updatePlant', () => {
    it('should update a plant', async () => {
      const id = v4();
      const newPlant: Plant = {
        id,
        name: 'Plant 3',
        createdAt,
      };
      jest.spyOn(plantsService, 'update').mockResolvedValue(newPlant);

      const response = await request(app.getHttpServer())
        .post(graphqlEndPoint)
        .send({
          query: `
            mutation {
              updatePlant(
                id: "${id}",
                updatePlantInput: { name: "New name" }
              ) {
                  id
                  name
                  createdAt
                }
              }
          `,
        })
        .expect(200);

      expect(response.body.data.updatePlant).toEqual({
        id,
        name: 'New name',
        createdAt: createdAtString,
      });
    });
  });
});
