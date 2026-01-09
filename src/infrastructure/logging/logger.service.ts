import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { Logger } from '@nestjs/common';

export interface LogContext {
  requestId?: string;
  userId?: string;
  organizationId?: string;
  [key: string]: unknown;
}

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private context?: string;
  private requestId?: string;
  private userId?: string;
  private organizationId?: string;

  constructor(context?: string) {
    this.context = context;
  }

  /**
   * Set the request context for this logger instance
   */
  setContext(context: {
    requestId?: string;
    userId?: string;
    organizationId?: string;
  }): void {
    this.requestId = context.requestId;
    this.userId = context.userId;
    this.organizationId = context.organizationId;
  }

  /**
   * Build structured log message with context
   */
  private buildMessage(message: string, context?: LogContext): string {
    const logData: Record<string, unknown> = {
      message,
      ...(this.context && { context: this.context }),
      ...(this.requestId && { requestId: this.requestId }),
      ...(this.userId && { userId: this.userId }),
      ...(this.organizationId && { organizationId: this.organizationId }),
      ...context,
    };

    return JSON.stringify(logData);
  }

  log(message: string, context?: LogContext): void {
    Logger.log(this.buildMessage(message, context), this.context);
  }

  error(message: string, trace?: string, context?: LogContext): void {
    const logData: Record<string, unknown> = {
      message,
      ...(this.context && { context: this.context }),
      ...(this.requestId && { requestId: this.requestId }),
      ...(this.userId && { userId: this.userId }),
      ...(this.organizationId && { organizationId: this.organizationId }),
      ...(trace && { trace }),
      ...context,
    };

    Logger.error(JSON.stringify(logData), trace, this.context);
  }

  warn(message: string, context?: LogContext): void {
    Logger.warn(this.buildMessage(message, context), this.context);
  }

  debug(message: string, context?: LogContext): void {
    Logger.debug(this.buildMessage(message, context), this.context);
  }

  verbose(message: string, context?: LogContext): void {
    Logger.verbose(this.buildMessage(message, context), this.context);
  }
}
