# Authentication Module

This module handles JWT-based authentication with access tokens and refresh tokens.

## Features

- **Email/Password Authentication**: Secure login with bcrypt password hashing
- **JWT Access Tokens**: Short-lived tokens (default: 15 minutes)
- **Refresh Tokens**: Long-lived tokens (default: 7 days) with rotation
- **Token Revocation**: Logout invalidates refresh tokens
- **Token Rotation**: Refresh token is rotated on each refresh request

## API Endpoints

### POST `/auth/signup`

Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Note:** `firstName` and `lastName` are optional.

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 900
}
```

**Errors:**
- `409 Conflict` - Email already registered

### POST `/auth/login`

Authenticate with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 900
}
```

### POST `/auth/refresh`

Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 900
}
```

**Note:** The refresh token is rotated (old one is revoked, new one is issued).

### POST `/auth/logout`

Revoke a refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** `204 No Content`

## Configuration

Set these environment variables in your `.env` file:

```env
JWT_ACCESS_SECRET=your-access-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

## Security Features

1. **Password Hashing**: Uses bcrypt with salt rounds
2. **Token Hashing**: Refresh tokens are hashed (SHA-256) before storage
3. **Token Rotation**: Refresh tokens are rotated on each refresh
4. **Token Revocation**: Logout revokes refresh tokens
5. **Expiration**: Both tokens have configurable expiration times

## Usage in Protected Routes

To protect routes with JWT authentication, you'll need to:

1. Create a JWT strategy (using Passport)
2. Create an AuthGuard
3. Apply the guard to your controllers/routes

Example:
```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user; // Contains the JWT payload (userId from 'sub' claim)
}
```

## Token Structure

**Access Token Payload:**
```json
{
  "sub": "user-id",
  "iat": 1234567890,
  "exp": 1234568790
}
```

**Refresh Token Payload:**
```json
{
  "sub": "user-id",
  "jti": "unique-token-id",
  "iat": 1234567890,
  "exp": 1234571490
}
```
