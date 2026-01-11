import { ExceptionCodes } from '@shared/error';
import { HttpStatus } from '@nestjs/common';
import { ExceptionBase } from './exception.base';

export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ExceptionCodes.ARGUMENT_INVALID;
  readonly statusCode = HttpStatus.BAD_REQUEST;
}

export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ExceptionCodes.ARGUMENT_NOT_PROVIDED;
  readonly statusCode = HttpStatus.BAD_REQUEST;
}

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ExceptionCodes.ARGUMENT_OUT_OF_RANGE;
  readonly statusCode = HttpStatus.BAD_REQUEST;
}

export class ConflictException extends ExceptionBase {
  readonly code = ExceptionCodes.CONFLICT;
  readonly statusCode = HttpStatus.CONFLICT;
}

export class NotFoundException extends ExceptionBase {
  static readonly message = 'NOT_FOUND';
  readonly code = ExceptionCodes.NOT_FOUND;
  readonly statusCode = HttpStatus.NOT_FOUND;

  constructor(message = NotFoundException.message, cause?: Error) {
    super(message, cause);
  }
}

export class UnauthorizedException extends ExceptionBase {
  static readonly message = 'Unauthorized';
  readonly code = ExceptionCodes.UNAUTHORIZED;
  readonly statusCode = HttpStatus.UNAUTHORIZED;

  constructor(message = UnauthorizedException.message, cause?: Error) {
    super(message, cause);
  }
}

export class ForbiddenException extends ExceptionBase {
  static readonly message = 'Forbidden';
  readonly code = ExceptionCodes.FORBBIDEN;
  readonly statusCode = HttpStatus.FORBIDDEN;

  constructor(message = ForbiddenException.message, cause?: Error) {
    super(message, cause);
  }
}

export class ServiceUnavailableException extends ExceptionBase {
  static readonly message = 'Service unavailable';
  readonly code = ExceptionCodes.SERVICE_UNAVAILABLE;
  readonly statusCode = HttpStatus.SERVICE_UNAVAILABLE;

  constructor(message = ServiceUnavailableException.message, cause?: Error) {
    super(message, cause);
  }
}

export class InternalServerErrorException extends ExceptionBase {
  static readonly message = 'Internal server error';
  readonly code = ExceptionCodes.INTERNAL_SERVER_ERROR;
  readonly statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(message = InternalServerErrorException.message, cause?: Error) {
    super(message, cause);
  }
}
