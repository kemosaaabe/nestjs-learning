import { Inject, Injectable } from '@nestjs/common';
import type { LoggerConfig } from './interfaces/logger.interface.js';
import { LOGGER_MODULE_OPTIONS_TOKEN } from './logger.module-definition.js';

@Injectable()
export class LoggerService {
  constructor(
    @Inject(LOGGER_MODULE_OPTIONS_TOKEN) private readonly config: LoggerConfig,
  ) {}

  log(message: string) {
    if (this.config.enabled) {
      console.log(`[${this.config.prefix}] ${message}`);
    }
  }
}
