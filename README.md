# SAAS-Bootstrap
Saas project starter to bootstrap the platform correctly

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js (v20 LTS recommended - see `.nvmrc`)
- npm or yarn

### Node.js Version Management

This project uses Node.js v20 (specified in `.nvmrc`). To update or manage your Node.js version:

#### Option 1: Using NVM (Recommended for macOS/Linux)

1. **Install NVM** (if not already installed):
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   ```
   Then restart your terminal or run:
   ```bash
   source ~/.zshrc  # or ~/.bashrc if using bash
   ```

2. **Install and use the project's Node.js version:**
   ```bash
   nvm install        # Installs version from .nvmrc
   nvm use            # Switches to the version in .nvmrc
   ```

3. **Or install the latest LTS version:**
   ```bash
   nvm install --lts
   nvm use --lts
   ```

4. **Set as default** (optional):
   ```bash
   nvm alias default 20
   ```

#### Option 2: Using Homebrew (macOS)

```bash
brew update
brew upgrade node
```

#### Option 3: Official Installer

Download and install from [nodejs.org](https://nodejs.org/)

**Verify your Node.js version:**
```bash
node --version  # Should show v20.x.x or higher
npm --version   # Update npm: npm install -g npm@latest
```

### Database Setup with Docker

1. **Start PostgreSQL container:**
   ```bash
   docker-compose up -d
   ```

2. **Create `.env` file** in the root directory:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/saas_bootstrap?schema=public"
   ```

   Or customize the connection string if you changed the default credentials in `docker-compose.yml`.

   **Note:** This project uses Prisma 7, which requires the database URL to be configured in `prisma.config.js` (already set up). The connection string from `.env` is automatically used by Prisma Migrate.

3. **Install Prisma CLI** (if not already installed):
   ```bash
   npm install -D prisma
   # or
   yarn add -D prisma
   ```

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

   This will:
   - Create the database schema in PostgreSQL
   - Generate the Prisma Client
   - Create a migration history

6. **Verify the database** (optional):
   ```bash
   npx prisma studio
   ```
   This opens a visual database browser at `http://localhost:5555`

### Docker Commands

- **Start PostgreSQL:** `docker-compose up -d`
- **Stop PostgreSQL:** `docker-compose down`
- **View logs:** `docker-compose logs -f postgres`
- **Stop and remove volumes** (⚠️ deletes all data): `docker-compose down -v`

### Database Connection

The default connection string format is:
```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?schema=public
```

Default values from `docker-compose.yml`:
- User: `postgres`
- Password: `postgres`
- Host: `localhost`
- Port: `5432`
- Database: `saas_bootstrap`

### NestJS Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

3. **Start the development server:**
   ```bash
   npm run start:dev
   ```

   The application will be available at `http://localhost:3000`

### Repository Pattern

This project follows a layered architecture with repository pattern:

- **Domain Layer** (`src/domain/repositories/`): Repository interfaces defining contracts
- **Infrastructure Layer** (`src/infrastructure/repositories/`): Prisma-based implementations

**Available Repositories:**
- `UserRepository` - User management
- `OrganizationRepository` - Organization management
- `MembershipRepository` - User-Organization relationships
- `RoleRepository` - Role management
- `PermissionRepository` - Permission management
- `RolePermissionRepository` - Role-Permission mappings
- `ProjectRepository` - Project management (example domain)
- `RefreshTokenRepository` - Refresh token management

**Using Repositories in Services:**

```typescript
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/infrastructure/repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(id: string) {
    return this.userRepository.findById(id);
  }
}
```

### Logging

The application includes structured logging with request ID propagation:

- **Structured Logs**: All logs are output as JSON with consistent structure
- **Request IDs**: Each request gets a unique ID that propagates through the stack
- **Context Tracking**: Request context (userId, organizationId) is automatically included
- **Error Handling**: Centralized exception filter logs all errors with proper context

**Using the Logger:**

```typescript
import { Injectable } from '@nestjs/common';
import { AppLogger } from '@/infrastructure/logging';

@Injectable()
export class UserService {
  private readonly logger = new AppLogger(UserService.name);

  async findUser(id: string) {
    this.logger.log('Finding user', { userId: id });
    // ... your code
  }
}
```

Request IDs are automatically:
- Generated for each request (or read from `X-Request-Id` header)
- Added to response headers
- Included in all log messages

See `src/infrastructure/logging/README.md` for detailed documentation.

### Next Steps

After setting up the database and NestJS:
1. Configure authentication and authorization modules
2. Create application services (use cases)
3. Build API controllers
4. Implement organization context middleware
5. Add validation and error handling

## Project Structure

```
SAAS-Bootstrap/
├── docs/                      # Architecture and product documentation
├── prisma/                    # Prisma schema and migrations
│   ├── schema.prisma         # Database schema definition
│   └── migrations/           # Database migrations
├── src/                       # NestJS application source
│   ├── domain/               # Domain layer (business logic)
│   │   └── repositories/    # Repository interfaces
│   ├── infrastructure/       # Infrastructure layer
│   │   ├── prisma/          # Prisma service and module
│   │   └── repositories/    # Repository implementations
│   ├── app.module.ts        # Root application module
│   └── main.ts              # Application entry point
├── prisma.config.js          # Prisma 7 configuration (database URL)
├── docker-compose.yml        # PostgreSQL Docker configuration
├── .nvmrc                    # Node.js version specification
└── README.md
```
