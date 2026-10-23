import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError } from 'rxjs';

@Injectable()
export class ErrorLoggingInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        console.log(`[ERROR] ${errorMessage}`);

        throw error;
      }),
    );
  }
}
