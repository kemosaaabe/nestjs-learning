import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface IRequestInfo {
  method: string;
  path: string;
  userAgent: string;
}

export const RequestInfo = createParamDecorator<keyof IRequestInfo>(
  (data, context: ExecutionContext): IRequestInfo | string => {
    const request = context.switchToHttp().getRequest<Request>();

    const requestInfo: IRequestInfo = {
      method: request.method,
      path: request.path,
      userAgent: request.headers['user-agent'] || '',
    };

    if (data) {
      return requestInfo[data];
    }

    return requestInfo;
  },
);
