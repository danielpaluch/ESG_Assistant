import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiErrorResponse } from './api-error.response';
import { ExceptionBase } from './exception.base';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'INTERNAL_SERVER_ERROR';
    let subErrors: string[] | undefined;

    if (exception instanceof ExceptionBase) {
      status = exception.statusCode;
      message = exception.message;
      error = exception.code;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse() as
        | string
        | { message?: string | string[]; error?: string };

      if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (responseBody && typeof responseBody === 'object') {
        if (Array.isArray(responseBody.message)) {
          subErrors = responseBody.message;
          message = 'Validation error';
        } else if (responseBody.message) {
          message = responseBody.message;
        } else {
          message = exception.message;
        }

        if (responseBody.error) {
          error = responseBody.error;
        }
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const body = new ApiErrorResponse({
      statusCode: status,
      message,
      error,
      subErrors,
    });

    response.status(status).json(body);
  }
}
