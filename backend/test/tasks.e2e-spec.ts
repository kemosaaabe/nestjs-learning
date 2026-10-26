import {
  StandardSchemaValidationPipe,
  type INestApplication,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';

describe('Tasks API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new StandardSchemaValidationPipe());

    await app.init();
  });

  describe('GET /tasks', () => {
    it('should return tasks on GET /tasks', async () => {
      const response = await request(app.getHttpServer())
        .get('/tasks')
        .set('x-role', 'user')
        .expect(200);

      expect(response.body).toEqual({ data: [] });
    });

    it('should return forbidden error on GET /tasks without role', async () => {
      await request(app.getHttpServer()).get('/tasks').expect(403);
    });
  });

  describe('POST /tasks', () => {
    it('should create task on POST /tasks', async () => {
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .set('x-role', 'user')
        .send({ title: 'task from sanek', description: 'lol' })
        .expect(201);

      expect(response.body).toMatchObject({
        data: {
          id: 1,
          status: 'todo',
          title: 'task from sanek',
          description: 'lol',
        },
      });
    });

    it('should return a BadRequest error on POST /tasks', async () => {
      await request(app.getHttpServer())
        .post('/tasks')
        .set('x-role', 'user')
        .send({ description: 'lol' })
        .expect(400);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
