import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { TasksModule } from './tasks/tasks.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module.js';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    LoggerModule.register({ prefix: 'HTTP_ERRORS', enabled: true }),
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}
