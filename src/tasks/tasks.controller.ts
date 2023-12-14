import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() task: CreateTaskDto) {
    return this.tasksService.create(task);
  }

  @Get()
  async getAll() {
    return this.tasksService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateTaskDto) {
    return this.tasksService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }
}
