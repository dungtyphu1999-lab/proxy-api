import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpStatus,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { ErrorResponseDto } from '../dto/response.dto';
import { HttpAdapterHost } from '@nestjs/core';
import { isObject } from 'lodash';
import { Request } from 'express';
import { AppValidationErrors } from '../dto/app-validation-error.dto';
import { ErrorCode } from '../constants/error-codes.enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const timestamp = new Date().toISOString();
    const path = request.url;

    const dto = this.toResponseDto(exception);

    this.logError(exception, request, dto);

    httpAdapter.reply(
      ctx.getResponse(),
      { ...dto, timestamp, path },
      dto.status_code,
    );
  }

  private toResponseDto(exception: unknown): ErrorResponseDto {
    if (exception instanceof BadRequestException) {
      return this.handleBadRequestException(exception);
    }

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception);
    }

    return {
      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Internal server error',
    };
  }

  private handleBadRequestException(
    exception: BadRequestException,
  ): ErrorResponseDto {
    const status = exception.getStatus();
    const response = exception.getResponse();
    let errors: AppValidationErrors | undefined = undefined;
    let message = exception.message;

    if (isObject(response)) {
      const responseObj = response as Record<string, unknown>;

      // Handle validation errors from class-validator
      if (responseObj.errors instanceof AppValidationErrors) {
        errors = responseObj.errors;
      }

      // Handle message from the custom exception factory
      if (typeof responseObj.message === 'string') {
        message = responseObj.message;
      } else if (Array.isArray(responseObj.message)) {
        message = responseObj.message.join(', ');
      }
    }

    // Check if message is an error code
    if (this.isErrorCode(message)) {
      return {
        status_code: status,
        success: false,
        message: 'Bad Request',
        error_code: message,
        errors: errors,
      };
    }

    return {
      status_code: status,
      success: false,
      message,
      errors: errors,
    };
  }

  private handleHttpException(exception: HttpException): ErrorResponseDto {
    const status = exception.getStatus();
    const response = exception.getResponse();

    let message = 'Unknown error';

    if (typeof response === 'string') {
      message = response;
    } else if (isObject(response)) {
      const responseObj = response as Record<string, unknown>;

      if (typeof responseObj.message === 'string') {
        message = responseObj.message;
      } else if (Array.isArray(responseObj.message)) {
        message = responseObj.message.join(', ');
      } else if (responseObj.error && typeof responseObj.error === 'string') {
        message = responseObj.error;
      }
    }

    // Check if message is an error code
    if (this.isErrorCode(message)) {
      return {
        status_code: status,
        success: false,
        message: this.getHttpStatusText(status),
        error_code: message,
      };
    }

    return {
      status_code: status,
      success: false,
      message,
    };
  }

  private isErrorCode(message: string): boolean {
    return Object.values(ErrorCode).includes(message as ErrorCode);
  }

  private getHttpStatusText(status: number): string {
    switch (status) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 409:
        return 'Conflict';
      case 500:
        return 'Internal Server Error';
      default:
        return 'Unknown Error';
    }
  }

  private logError(
    exception: unknown,
    request: Request,
    dto: ErrorResponseDto,
  ): void {
    const context = {
      method: request.method,
      url: request.url,
      userAgent: request.get('User-Agent'),
      ip: request.ip,
      status_code: dto.status_code,
    };

    if (dto.status_code >= 500) {
      this.logger.error(
        `Internal Server Error: ${dto.message}`,
        exception instanceof Error ? exception.stack : String(exception),
        context,
      );
    } else if (dto.status_code >= 400) {
      this.logger.warn(`Client Error: ${dto.message}`, context);
    } else {
      this.logger.log(`Request completed: ${dto.message}`, context);
    }
  }
}
