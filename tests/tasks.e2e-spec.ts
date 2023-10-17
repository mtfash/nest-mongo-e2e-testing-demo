import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import mongoose from 'mongoose';
import { AppModule } from '../src/app.module';

let app: INestApplication;
let DB: typeof mongoose;

beforeEach(async () => {
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

afterEach(async () => {
  await DB.connection.db.dropDatabase();
  await mongoose.disconnect();
  await app.close();
});

describe('POST /api/v1/tasks', () => {
  it('should create and return the task in the response', () => {
    const task = {
      name: 'Task title goes here',
      description: 'Task description goes here',
      priority: 'high',
      done: false,
    };

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

  it('should returns a 400 status code for input', () => {
    const task = {};

    return request(app.getHttpServer())
      .post('/api/v1/tasks')
      .send(task)
      .expect(400)
      .then((res) => {
        console.log(res.body);
      });
  });
});
