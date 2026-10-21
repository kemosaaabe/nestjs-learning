import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import type {
  CreateTaskDto,
  UpdateTaskDto,
} from './interfaces/tasks.interface.js';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe.js';

@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  getTask(@Param('id', PositiveIntPipe) taskId: number) {
    return this.tasksService.getTask(taskId);
  }

  @Post()
  createTask(@Body() taskDto: CreateTaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @Patch(':id')
  updateTask(
    @Body() task: UpdateTaskDto,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.tasksService.updateTask(taskId, task);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) taskId: number) {
    return this.tasksService.deleteTask(taskId);
  }
}
