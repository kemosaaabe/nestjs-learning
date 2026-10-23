import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { of, tap, timeout } from 'rxjs';
import { tasksCache } from '../test-cache/cache.js';
import type { Request } from 'express';
import type { Task } from '../interfaces/tasks.interface.js';

@Injectable()
export class CachedTaskInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<Task>) {
    const request = context.switchToHttp().getRequest<Request>();
    const taskId = Number(request.params?.id);

    if (taskId && tasksCache.has(taskId)) {
      return of(tasksCache.get(taskId));
    }

    return next.handle().pipe(
      timeout(10000),
      tap((task) => {
        if (task.id && !tasksCache.has(task.id)) {
          tasksCache.set(task.id, task);

          setTimeout(() => {
            tasksCache.delete(task.id);
          }, 10000);
        }
      }),
    );
  }
}
