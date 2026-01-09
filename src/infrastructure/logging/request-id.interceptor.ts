import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { AppLogger } from './logger.service';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  private readonly logger = new AppLogger(RequestIdInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Generate or use existing request ID from header
    const requestId =
      request.headers['x-request-id'] || request.headers['x-correlation-id'] || uuidv4();

    // Set request ID in request object for access throughout the request lifecycle
    request.requestId = requestId;

    // Set request ID in response header
    response.setHeader('X-Request-Id', requestId);

    // Set context for logging
    this.logger.setContext({ requestId });

    const { method, url, ip } = request;
    const startTime = Date.now();

    this.logger.log('Incoming request', {
      method,
      url,
      ip,
      userAgent: request.headers['user-agent'],
    });

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.log('Request completed', {
            method,
            url,
            statusCode: response.statusCode,
            duration: `${duration}ms`,
          });
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error('Request failed', error.stack, {
            method,
            url,
            statusCode: response.statusCode || 500,
            duration: `${duration}ms`,
            error: error.message,
          });
        },
      }),
    );
  }
}
