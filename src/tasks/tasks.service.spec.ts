import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksService', () => {
  let taskService: TasksService;
  let prismaService: PrismaService;

  const createData: CreateTaskDto = { title: 'test title' };
  const updateData: UpdateTaskDto = { isDone: true };
  const task: Task = { id: 1, ...createData, isDone: false, ...updateData };
  const taskList = [task];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
      imports: [PrismaModule],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('create should return the created task', async () => {
    jest.spyOn(prismaService.task, 'create').mockResolvedValue(task);

    const result = await taskService.create(createData);
    expect(result).toBe(task);
  });

  it('findAll should return all tasks', async () => {
    jest.spyOn(prismaService.task, 'findMany').mockResolvedValue(taskList);

    const result = await taskService.findAll();
    expect(result).toBe(taskList);
  });

  it('update should return de updated task', async () => {
    jest.spyOn(prismaService.task, 'update').mockResolvedValue(task);

    const result = await taskService.update(task.id, updateData);
    expect(result).toBe(task);
  });

  it('delete should return nothing', async () => {
    jest.spyOn(prismaService.task, 'delete').mockResolvedValue(task);

    const result = await taskService.delete(task.id);

    expect(result).toBe(undefined);
    expect(prismaService.task.delete).toHaveBeenCalled();
  });

  it("update should throw an error when the taks to update doesn't exists", async () => {
    jest.spyOn(prismaService.task, 'findUnique').mockReturnValue(null);
    await expect(taskService.update(task.id, updateData)).rejects.toThrow(
      NotFoundException,
    );
  });

  it("delete should throw an error when the task to delete doesn't exists", async () => {
    jest.spyOn(prismaService.task, 'findUnique').mockReturnValue(null);
    await expect(taskService.delete(task.id)).rejects.toThrow(
      NotFoundException,
    );
  });
});
