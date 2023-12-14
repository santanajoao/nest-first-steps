import { Task } from '@prisma/client';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';

export const createData: CreateTaskDto = { title: 'test title' };
export const updateData: UpdateTaskDto = { isDone: true };

export const task: Task = {
  id: 1,
  ...createData,
  isDone: false,
  ...updateData,
};

export const taskList = [task];
