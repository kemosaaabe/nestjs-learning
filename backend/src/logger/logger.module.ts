import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service.js';
import { LoggerConfigurableModuleClass } from './logger.module-definition.js';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule extends LoggerConfigurableModuleClass {}
