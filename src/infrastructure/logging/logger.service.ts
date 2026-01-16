import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { Logger } from '@nestjs/common';

export interface LogContext {
  requestId?: string;
  userId?: string;
  organizationId?: string;
  [key: string]: unknown;
}

@Injectable({ scope: Scope.DEFAULT }) // ⬅️ IMPORTANT
export class AppLogger implements LoggerService {
  private context?: string;
  private requestId?: string;
  private userId?: string;
  private organizationId?: string;

  // 🚫 NO constructor arguments
  constructor() {}

  setContext(context: {
    requestId?: string;
    userId?: string;
    organizationId?: string;
    loggerContext?: string;
  }): void {
    this.requestId = context.requestId;
    this.userId = context.userId;
    this.organizationId = context.organizationId;

    if (context.loggerContext) {
      this.context = context.loggerContext;
    }
  }

  private buildMessage(message: string, context?: LogContext): string {
    return JSON.stringify({
      message,
      ...(this.context && { context: this.context }),
      ...(this.requestId && { requestId: this.requestId }),
      ...(this.userId && { userId: this.userId }),
      ...(this.organizationId && { organizationId: this.organizationId }),
      ...context,
    });
  }
  log(message: string, context?: LogContext): void {
    console.log(this.buildMessage(message, context));
  }

  error(message: string, trace?: string, context?: LogContext): void {
    console.error(this.buildMessage(message, { ...context, trace }));
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.buildMessage(message, context));
  }

  debug(message: string, context?: LogContext): void {
    console.debug(this.buildMessage(message, context));
  }

  verbose(message: string, context?: LogContext): void {
    console.info(this.buildMessage(message, context));
  }
}
