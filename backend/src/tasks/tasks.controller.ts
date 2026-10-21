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
import type { CreateTaskDto } from './schemas/create-task.schema.js';
import type { UpdateTaskDto } from './schemas/update-task.schema.js';
import { createTaskSchema } from './schemas/create-task.schema.js';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe.js';
import { updateTaskSchema } from './schemas/update-task.schema.js';

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
  createTask(@Body({ schema: createTaskSchema }) taskDto: CreateTaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @Patch(':id')
  updateTask(
    @Body({ schema: updateTaskSchema }) task: UpdateTaskDto,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.tasksService.updateTask(taskId, task);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) taskId: number) {
    return this.tasksService.deleteTask(taskId);
  }
}
