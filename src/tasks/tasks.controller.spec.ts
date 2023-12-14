import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaModule } from '../prisma/prisma.module';
import { createData, task, taskList } from '../mocks/task.mock';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll should return all tasks', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue(taskList);

    const result = await controller.getAll();
    expect(result).toBe(taskList);
  });

  it('create should return the created task', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(task);

    const result = await controller.create(createData);
    expect(result.title).toBe(task.title);
  });

  it('update should return the updated task', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(task);

    const result = await controller.update(1, {});
    expect(result).toBe(task);
  });

  it('delete should return nothing', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);

    const result = await controller.delete(1);
    expect(result).toBeUndefined();
  });
});
