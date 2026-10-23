import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { catchError, timeout, TimeoutError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      timeout(2000),
      catchError((error: unknown) => {
        if (error instanceof TimeoutError) {
          throw new RequestTimeoutException();
        }

        throw error;
      }),
    );
  }
}
