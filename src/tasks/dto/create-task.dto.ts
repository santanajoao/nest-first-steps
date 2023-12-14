import { Task } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

type TCreateTask = Omit<Task, 'id' | 'isDone'>;

export class CreateTaskDto implements TCreateTask {
  @IsString()
  @IsNotEmpty()
  title: string;
}
