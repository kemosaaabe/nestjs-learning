import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service.js';
import type { LoggerConfig } from './interfaces/logger.interface.js';

@Module({})
export class LoggerModule {
  static register(config: LoggerConfig): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: 'LOGGER_CONFIG',
          useValue: config,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }
}
