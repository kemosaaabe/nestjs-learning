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
import { Roles } from '../common/roles/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { rolesMap } from '../common/types/roles.js';

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
  @Roles([rolesMap.admin, rolesMap.user])
  @UseGuards(ApiKeyGuard, RolesGuard)
  createTask(@Body({ schema: createTaskSchema }) taskDto: CreateTaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @Patch(':id')
  @Roles([rolesMap.admin])
  @UseGuards(ApiKeyGuard, RolesGuard)
  updateTask(
    @Body({ schema: updateTaskSchema }) task: UpdateTaskDto,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.tasksService.updateTask(taskId, task);
  }

  @Delete(':id')
  @Roles([rolesMap.admin])
  @UseGuards(ApiKeyGuard, RolesGuard)
  deleteTask(@Param('id', ParseIntPipe) taskId: number) {
    return this.tasksService.deleteTask(taskId);
  }
}
