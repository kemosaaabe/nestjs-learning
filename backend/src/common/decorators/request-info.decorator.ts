import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface IRequestInfo {
  method: string;
  path: string;
  userAgent: string;
}

export const RequestInfo = createParamDecorator(
  (_data, context: ExecutionContext): IRequestInfo => {
    const request = context.switchToHttp().getRequest<Request>();

    return {
      method: request.method,
      path: request.path,
      userAgent: request.headers['user-agent'] || '',
    };
  },
);
