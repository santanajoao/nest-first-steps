import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async create(task: CreateTaskDto): Promise<Task> {
    return this.prismaService.task.create({ data: task });
  }

  async update(id: Task['id'], data: UpdateTaskDto): Promise<Task> {
    try {
      return this.prismaService.task.update({
        data: data,
        where: { id },
      });
    } catch {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<Task[]> {
    return this.prismaService.task.findMany();
  }

  async delete(id: Task['id']): Promise<void> {
    try {
      await this.prismaService.task.delete({ where: { id } });
    } catch {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
