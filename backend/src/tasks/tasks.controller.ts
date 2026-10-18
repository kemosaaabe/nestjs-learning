import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import type {
  CreateTaskDto,
  UpdateTaskDto,
} from './interfaces/tasks.interface.js';

@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  getTask(@Param('id') taskId: string) {
    return this.tasksService.getTask(Number(taskId));
  }

  @Post()
  createTask(@Body() taskDto: CreateTaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @Patch(':id')
  updateTask(@Body() task: UpdateTaskDto, @Param('id') taskId: string) {
    return this.tasksService.updateTask(Number(taskId), task);
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string) {
    return this.tasksService.deleteTask(Number(taskId));
  }
}
