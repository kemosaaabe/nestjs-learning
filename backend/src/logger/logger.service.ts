import { Inject, Injectable } from '@nestjs/common';
import type { LoggerConfig } from './interfaces/logger.interface.js';

@Injectable()
export class LoggerService {
  constructor(@Inject('LOGGER_CONFIG') private readonly config: LoggerConfig) {}

  log(message: string) {
    if (this.config.enabled) {
      console.log(`[${this.config.prefix}] ${message}`);
    }
  }
}
