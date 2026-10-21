import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto.js';
import {
  type TaskStatus,
  taskStatuses,
} from '../interfaces/tasks.interface.js';
import { IsIn, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsIn(taskStatuses)
  status?: TaskStatus;
}
