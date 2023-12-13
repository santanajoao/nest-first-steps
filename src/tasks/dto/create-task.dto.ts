import { Task } from '@prisma/client';

type TCreateTask = Omit<Task, 'id' | 'isDone'>;

export class CreateTaskDto implements TCreateTask {
  title: string;
}
