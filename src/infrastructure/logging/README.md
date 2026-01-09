# Logging Infrastructure

This module provides structured logging with request ID propagation throughout the application stack.

## Features

- **Structured Logging**: All logs are output as JSON with consistent structure
- **Request ID Tracking**: Each request gets a unique ID that propagates through the entire request lifecycle
- **Context Propagation**: Request context (userId, organizationId) is automatically included in logs
- **Centralized Error Handling**: All exceptions are caught and logged with proper context
- **HTTP Request/Response Logging**: Automatic logging of incoming requests and responses

## Usage

### Basic Usage in Services

```typescript
import { Injectable } from '@nestjs/common';
import { AppLogger } from '@/infrastructure/logging';

@Injectable()
export class UserService {
  private readonly logger = new AppLogger(UserService.name);

  async findUser(id: string) {
    this.logger.log('Finding user', { userId: id });
    
    try {
      const user = await this.userRepository.findById(id);
      this.logger.log('User found', { userId: id });
      return user;
    } catch (error) {
      this.logger.error('Failed to find user', error.stack, { userId: id });
      throw error;
    }
  }
}
```

### With Additional Context

```typescript
this.logger.log('Processing payment', {
  amount: 100,
  currency: 'USD',
  paymentMethod: 'card',
});
```

### Request ID

Request IDs are automatically:
- Generated for each incoming request (or read from `X-Request-Id` header)
- Added to response headers as `X-Request-Id`
- Included in all log messages
- Available in the request object as `request.requestId`

### Error Logging

Errors are automatically caught and logged by the `HttpExceptionFilter`:
- HTTP errors (4xx) are logged as warnings
- Server errors (5xx) are logged as errors with stack traces
- All errors include request context (method, URL, requestId)

## Log Structure

All logs follow this JSON structure:

```json
{
  "message": "User found",
  "context": "UserService",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "user123",
  "organizationId": "org456",
  "customField": "value"
}
```

## Configuration

The logger uses NestJS's built-in Logger under the hood, which respects:
- `LOG_LEVEL` environment variable (if using custom logger configuration)
- NestJS's logger configuration in `main.ts`
