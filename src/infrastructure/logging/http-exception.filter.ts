import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLogger } from './logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new AppLogger();

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = (request as Request & { requestId?: string }).requestId;

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      requestId,
      ...(typeof message === 'string' ? { message } : { ...(message as Record<string, unknown>) }),
    };

    // Log the error
    this.logger.setContext({ requestId });
    if (status >= 500) {
      this.logger.error(
        `HTTP ${status} Error: ${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
        {
          statusCode: status,
          path: request.url,
          method: request.method,
        },
      );
    } else {
      this.logger.warn(`HTTP ${status} Error: ${request.method} ${request.url}`, {
        statusCode: status,
        path: request.url,
        method: request.method,
        message: typeof message === 'string' ? message : JSON.stringify(message),
      });
    }

    response.status(status).json(errorResponse);
  }
}
