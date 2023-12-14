import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { createData, task, taskList, updateData } from '../src/mocks/task.mock';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    jest.spyOn(prismaService, '$connect').mockImplementation(async () => {});

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.OK)
      .expect('Hello World!');
  });

  describe('/tasks', () => {
    it('GET', () => {
      jest.spyOn(prismaService.task, 'findMany').mockResolvedValue(taskList);

      return request(app.getHttpServer())
        .get('/tasks')
        .expect(HttpStatus.OK)
        .expect(taskList);
    });

    it('POST', () => {
      jest.spyOn(prismaService.task, 'create').mockResolvedValue(task);

      return request(app.getHttpServer())
        .post('/tasks')
        .send(createData)
        .expect(HttpStatus.CREATED)
        .expect(task);
    });

    it('PATCH success', () => {
      jest.spyOn(prismaService.task, 'findUnique').mockResolvedValue(task);
      jest.spyOn(prismaService.task, 'update').mockResolvedValue(task);

      return request(app.getHttpServer())
        .patch('/tasks/1')
        .send(updateData)
        .expect(HttpStatus.OK)
        .expect(task);
    });

    it('PATCH not found', () => {
      jest.spyOn(prismaService.task, 'findUnique').mockReturnValue(null);

      return request(app.getHttpServer())
        .patch('/tasks/9999')
        .send(updateData)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('DELETE success', () => {
      jest.spyOn(prismaService.task, 'findUnique').mockResolvedValue(task);
      jest.spyOn(prismaService.task, 'delete').mockResolvedValue(task);

      return request(app.getHttpServer())
        .delete('/tasks/1')
        .expect(HttpStatus.NO_CONTENT);
    });

    it('DELETE not found', () => {
      jest.spyOn(prismaService.task, 'findUnique').mockReturnValue(null);

      return request(app.getHttpServer())
        .delete('/tasks/99999')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
