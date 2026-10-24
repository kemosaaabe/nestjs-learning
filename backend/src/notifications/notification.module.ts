import { Module } from '@nestjs/common';
import {
  NOTIFICATION_CONFIG,
  NOTIFICATION_PREFIX,
  NotificationService,
  TelegramNotificationService,
} from './notification.service.js';
import { NotificationController } from './notification.controller.js';
import type { NotificationConfig } from './interfaces/notification.interface.js';

@Module({
  providers: [
    { provide: NotificationService, useClass: TelegramNotificationService },
    { provide: NOTIFICATION_PREFIX, useValue: '[Task Manager]' },
    {
      provide: NOTIFICATION_CONFIG,
      useFactory: (prefix: string): NotificationConfig => {
        return { prefix, enabled: true };
      },
      inject: [NOTIFICATION_PREFIX],
    },
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
