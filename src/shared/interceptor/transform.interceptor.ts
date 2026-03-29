import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponseDto } from '../dto/response.dto';

import { Request, Response } from 'express';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, SuccessResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponseDto<T>> {
    const timestamp = new Date().toISOString();
    const httpContext = context.switchToHttp();
    const path = httpContext.getRequest<Request>().url;

    return next.handle().pipe(
      map((data: T) => {
        const response = httpContext.getResponse<Response>();
        return {
          status_code: response.statusCode,
          success: true,
          message: response.statusMessage || 'Success',
          data,
          timestamp,
          path,
        };
      }),
    );
  }
}
