import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { TaskController } from './tasks.controller.js';
import { LoggerModule } from '../logger/logger.module.js';
import { RequestLoggerMiddleware } from './middleware/tasks.middleware.js';

@Module({
  imports: [LoggerModule.register({ prefix: 'TASKS_APP', enabled: true })],
  providers: [TasksService],
  controllers: [TaskController],
  exports: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes(
        { path: 'tasks', method: RequestMethod.POST },
        { path: 'tasks/:id', method: RequestMethod.PATCH },
        { path: 'tasks/:id', method: RequestMethod.DELETE },
      );
  }
}
