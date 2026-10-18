import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { TaskController } from './tasks.controller.js';
import { LoggerModule } from '../logger/logger.module.js';

@Module({
  imports: [LoggerModule.register({ prefix: 'TASKS_APP', enabled: true })],
  providers: [TasksService],
  controllers: [TaskController],
  exports: [TasksService],
})
export class TasksModule {}
