import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async create(task: CreateTaskDto): Promise<Task> {
    const createdTask = await this.prismaService.task.create({ data: task });

    return createdTask;
  }

  async update(id: Task['id'], data: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.prismaService.task.update({
      data: data,
      where: { id },
    });

    return updatedTask;
  }

  async findAll(): Promise<Task[]> {
    return this.prismaService.task.findMany();
  }

  async delete(id: Task['id']): Promise<void> {
    await this.prismaService.task.delete({ where: { id } });
  }
}
