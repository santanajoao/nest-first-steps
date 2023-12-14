import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async create(task: CreateTaskDto): Promise<Task> {
    return this.prismaService.task.create({ data: task });
  }

  async verifyExistance(id: Task['id']): Promise<void> {
    const task = this.prismaService.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async update(id: Task['id'], data: UpdateTaskDto): Promise<Task> {
    await this.verifyExistance(id);

    return this.prismaService.task.update({
      data: data,
      where: { id },
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prismaService.task.findMany();
  }

  async delete(id: Task['id']): Promise<void> {
    await this.verifyExistance(id);

    await this.prismaService.task.delete({ where: { id } });
  }
}
