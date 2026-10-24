import { ConfigurableModuleBuilder } from '@nestjs/common';
import type { LoggerConfig } from './interfaces/logger.interface.js';

export const {
  ConfigurableModuleClass: LoggerConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: LOGGER_MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<LoggerConfig>()
  .setClassMethodName('forRoot')
  .setExtras({ isGlobal: false }, (definition, extras) => ({
    ...definition,
    global: extras.isGlobal,
  }))
  .build();
