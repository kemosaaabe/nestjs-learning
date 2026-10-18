import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { TasksModule } from '../tasks/tasks.module.js';
import { LoggerModule } from '../logger/logger.module.js';

@Module({
  imports: [
    TasksModule,
    LoggerModule.register({ prefix: 'USERS_APP', enabled: false }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
