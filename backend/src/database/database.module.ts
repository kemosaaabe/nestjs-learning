import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION, DatabaseService } from './database.service.js';
import { DatabaseConnection } from './interfaces/database.interface.js';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: async (): Promise<DatabaseConnection> => {
        console.log('Connecting to database...');

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log('Database connected!');

        return { connected: true, database: 'task_manager' };
      },
    },
    DatabaseService,
  ],
})
export class DatabaseModule {}
