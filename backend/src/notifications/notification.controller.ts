import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  NOTIFICATION_CONFIG,
  NotificationService,
} from './notification.service.js';
import type { NotificationConfig } from './interfaces/notification.interface.js';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject(NOTIFICATION_CONFIG)
    private readonly config: NotificationConfig,
  ) {}

  @Post()
  sendMessage(@Body('message') message: string) {
    console.log({ config: this.config });

    return this.notificationService.send(message);
  }
}
