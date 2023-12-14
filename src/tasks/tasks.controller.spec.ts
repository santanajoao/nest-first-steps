import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateTaskDto } from './dto/create-task.dto';

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
    const tasks: Task[] = [{ id: 3, isDone: false, title: 'test' }];
    jest.spyOn(service, 'findAll').mockImplementation(async () => tasks);

    const result = await controller.getAll();
    expect(result).toBe(tasks);
  });

  it('create should return the created task', async () => {
    const task: CreateTaskDto = { title: 'test' };
    const createdTask: Task = { ...task, id: 1, isDone: false };
    jest.spyOn(service, 'create').mockImplementation(async () => createdTask);

    const result = await controller.create(task);
    expect(result.title).toBe(task.title);
  });

  it('update should return the updated task', async () => {
    const task: Task = { title: 'other', id: 1, isDone: false };
    jest.spyOn(service, 'update').mockImplementation(async () => task);

    const result = await controller.update(1, {});
    expect(result).toBe(task);
  });

  it('delete should return nothing', async () => {
    jest.spyOn(service, 'delete').mockImplementation(async () => undefined);

    const result = await controller.delete(1);
    expect(result).toBeUndefined();
  });
});
