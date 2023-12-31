import {
  HttpStatus,
  INestApplication,
  ValidationPipe,
  ValidationPipeOptions,
  VersioningType,
} from '@nestjs/common';
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

  const validationOptions: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  };
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  await app.init();

  DB = await mongoose.connect(process.env.DB_URI);
  await DB.connection.db.dropDatabase();
});

afterEach(async () => {
  await DB.connection.db.dropDatabase();
  await mongoose.disconnect();
  await app.close();
});

describe('GET /api/v1/tasks', () => {
  it('should return an array of tasks', async () => {
    const server = app.getHttpServer();
    request(server)
      .get('/api/v1/tasks')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });
});

describe('POST /api/v1/tasks', () => {
  it('should create and return the task in the response', () => {
    const task = {
      name: 'Task title goes here',
      description: 'Task description goes here',
      priority: 'high',
      done: false,
    };

    request(app.getHttpServer())
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

  it('should returns a 400 status code for invalid input with proper messages', () => {
    request(app.getHttpServer())
      .post('/api/v1/tasks')
      .send({})
      .expect(400)
      .then((res) => {
        const messages = [
          'name should not be empty',
          'priority should not be empty',
          'done should not be empty',
          'done must be a boolean value',
        ];
        expect(res.body.message).toBeDefined();
        expect(Array.isArray(res.body.message)).toBeTruthy();
        messages.forEach((msg) =>
          expect(res.body.message.includes(msg)).toBeTruthy(),
        );
      });
  });
});
