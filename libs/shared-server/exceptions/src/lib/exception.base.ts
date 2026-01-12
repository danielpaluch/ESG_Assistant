export interface SerializedException {
  message: string;
  code: string;
  statusCode: number;
  cause?: string;
  metadata?: unknown;
}

export abstract class ExceptionBase extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
  readonly cause?: Error;
  readonly metadata?: unknown;

  constructor(message: string, cause?: Error, metadata?: unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.cause = cause;
    this.metadata = metadata;
  }

  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      cause: this.cause ? this.cause.message : undefined,
      metadata: this.metadata,
    };
  }
}
