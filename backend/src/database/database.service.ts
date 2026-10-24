import { Inject, Injectable } from '@nestjs/common';
import type { DatabaseConnection } from './interfaces/database.interface.js';

export const DATABASE_CONNECTION = Symbol('DATABASE_CONNECTION');

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly databaseConnection: DatabaseConnection,
  ) {
    console.log(
      `DatabaseService initialized: ${this.databaseConnection.database}`,
    );
  }
}
