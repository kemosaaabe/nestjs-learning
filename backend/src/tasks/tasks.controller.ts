import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe.js';
import { ApiKeyGuard } from '../common/guards/api-key.guard.js';
import { TasksService } from './tasks.service.js';
import type { CreateTaskDto } from './schemas/create-task.schema.js';
import type { UpdateTaskDto } from './schemas/update-task.schema.js';
import { createTaskSchema } from './schemas/create-task.schema.js';
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
  @UseGuards(ApiKeyGuard)
  createTask(@Body({ schema: createTaskSchema }) taskDto: CreateTaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  updateTask(
    @Body({ schema: updateTaskSchema }) task: UpdateTaskDto,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.tasksService.updateTask(taskId, task);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  deleteTask(@Param('id', ParseIntPipe) taskId: number) {
    return this.tasksService.deleteTask(taskId);
  }
}
