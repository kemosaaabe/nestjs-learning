import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../../logger/logger.service.js';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    this.loggerService.log(`${req.method} ${req.url}`);

    next();
  }
}
