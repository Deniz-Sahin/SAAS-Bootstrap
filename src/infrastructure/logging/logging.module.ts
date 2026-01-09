import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppLogger } from './logger.service';
import { RequestIdInterceptor } from './request-id.interceptor';
import { HttpExceptionFilter } from './http-exception.filter';

@Global()
@Module({
  providers: [
    AppLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestIdInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [AppLogger],
})
export class LoggingModule {}
