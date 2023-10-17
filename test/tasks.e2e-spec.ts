import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import mongoose from 'mongoose';
import { AppModule } from '../src/app.module';

let app: INestApplication;
let DB: typeof mongoose;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  await app.init();

  DB = await mongoose.connect(process.env.DB_URI);
  await DB.connection.db.dropDatabase();
});

afterAll(async () => {
  await DB.connection.db.dropDatabase();
  await mongoose.disconnect();
  await app.close();
});

describe('Tasks e2e', () => {
  const task = {
    name: 'Create github repository',
    description: 'Create a github repository for the tasks manager application',
    priority: 'high',
    done: false,
  };

  it('(POST) - create a new task', () => {
    return request(app.getHttpServer())
      .post('/api/v1/tasks')
      .send(task)
      .expect(201)
      .then((res) => {
        expect(res.body._id).toBeDefined();
        expect(res.body.name).toEqual(task.name);
        expect(res.body.description).toEqual(task.description);
        expect(res.body.priority).toEqual(task.priority);
        expect(res.body.done).toEqual(task.done);
      });
  });
});
