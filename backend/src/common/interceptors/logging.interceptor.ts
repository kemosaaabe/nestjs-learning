import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { finalize } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const controllerMethodString = `${request.method} ${request.path}`;

    const startTime = Date.now();
    console.log(`[START] ${controllerMethodString}`);

    return next.handle().pipe(
      finalize(() => {
        console.log(
          `[END] ${controllerMethodString} — ${Date.now() - startTime}ms`,
        );
      }),
    );
  }
}
