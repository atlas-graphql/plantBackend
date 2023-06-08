import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Plant } from "../src/plants/models/plant.model";
import { AppModule } from "../src/app.module";

const todayDate = new Date();

const plants: Plant[] = [
  {
    id: '1',
    name: 'Ventus',
    createdAt: todayDate,
    boughtAt: todayDate,
    deceasedAt: todayDate,
  },
  {
    id: '2',
    name: 'Maria',
    createdAt: todayDate,
    boughtAt: todayDate,
    deceasedAt: todayDate,
  },
];

const gql = '/graphql';

describe('GraphQL AppResolver (e2e) {Supertest}', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("Query of Plant", () => {
    const query = '{getPlants {id name createdAt boughtAt deceasedAt}}';
    describe('plants', () => {
      it('should get the plants array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({ query })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.getCats).toEqual(plants);
          });
      });
      describe('one plant', () => {
        const query = '{getPlant(plantId:{id:"2"}){id name createdAt boughtAt deceasedAt}}';
        it('should get a single plant', () => {
          return request(app.getHttpServer())
            .post(gql)
            .send({ query })
            .expect(200)
            .expect((res) => {
              expect(res.body.data.getPlant).toEqual({
                id: '2',
                name: 'Maria',
                createdAt: todayDate,
                boughtAt: todayDate,
                deceasedAt: todayDate,
              },);
            });
        });
        it('should get an error for bad id', () => {
          const query = '{getPlant(plantId:{id:"500"}){id name createdAt boughtAt deceasedAt}}';
          return request(app.getHttpServer())
            .post(gql)
            .send({ query })
            .expect(200)
            .expect((res) => {
              expect(res.body.data).toBe(null);
              expect(res.body.errors[0].message).toBe(
                'No cat with id 500 found',
              );
            });
        });
      });
    });
  });

  describe("Mutation of Plant", () => {
    it('should create a new Plant and have it added to the array', () => {
      const query = `
        mutation createPlant({name: "Planten", picture: "pic"}: CreatePlantInput!) {
            createPlant(createPlantInput: $createPlantInput) {
              id
              name
            }
        }`;
      return (
        request(app.getHttpServer())
          .post(gql)
          .send({
            query
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createPlant).toEqual({
              id: '3',
              name: 'Planten',
              picture: 'pic',
            });
          })
      );
    });
  })
});
