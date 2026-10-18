import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { TasksModule } from './tasks/tasks.module.js';

@Module({
  imports: [UsersModule, TasksModule],
})
export class AppModule {}
