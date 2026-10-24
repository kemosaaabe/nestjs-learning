import { Injectable } from '@nestjs/common';

export abstract class NotificationService {
  abstract send(message: string): void;
}

@Injectable()
export class EmailNotificationService extends NotificationService {
  send(message: string) {
    console.log(`[Email]: ${message}`);
  }
}

@Injectable()
export class TelegramNotificationService extends NotificationService {
  send(message: string) {
    console.log(`[Telegram]: ${message}`);
  }
}

export const NOTIFICATION_PREFIX = Symbol('NOTIFICATION_PREFIX');
export const NOTIFICATION_CONFIG = Symbol('NOTIFICATION_CONFIG');
