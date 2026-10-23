import { Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import type { Request } from 'express';
import { LoggerService } from '../../logger/logger.service.js';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {
    super();
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.loggerService.log(`${status} ${request.method} ${request.url}`);

    super.catch(exception, host);
  }
}
