import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { TaskController } from './tasks.controller.js';
import { LoggerModule } from '../logger/logger.module.js';
import { RequestLoggerMiddleware } from './middleware/tasks.middleware.js';

@Module({
  imports: [
    LoggerModule.forRoot({
      prefix: 'TASKS_APP',
      enabled: true,
    }),
  ],
  providers: [TasksService],
  controllers: [TaskController],
  exports: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes(TaskController);
  }
}
