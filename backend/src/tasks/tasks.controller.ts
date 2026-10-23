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
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe.js';
import { TasksService } from './tasks.service.js';
import type { CreateTaskDto } from './schemas/create-task.schema.js';
import type { UpdateTaskDto } from './schemas/update-task.schema.js';
import { createTaskSchema } from './schemas/create-task.schema.js';
import { updateTaskSchema } from './schemas/update-task.schema.js';
import { Roles } from '../common/roles/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { rolesMap } from '../common/types/roles.js';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor.js';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor.js';

@Controller('tasks')
@Roles([rolesMap.admin])
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class TaskController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Roles([rolesMap.admin, rolesMap.manager, rolesMap.user])
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  @Roles([rolesMap.admin, rolesMap.manager, rolesMap.user])
  getTask(@Param('id', PositiveIntPipe) taskId: number) {
    return this.tasksService.getTask(taskId);
  }

  @Post()
  @Roles([rolesMap.admin, rolesMap.manager, rolesMap.user])
  createTask(@Body({ schema: createTaskSchema }) taskDto: CreateTaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @Patch(':id')
  @Roles([rolesMap.admin, rolesMap.manager])
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
