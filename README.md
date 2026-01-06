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

### Next Steps

After setting up the database:
1. Install project dependencies: `npm install` or `yarn install`
2. Set up your NestJS application structure
3. Configure authentication and authorization modules
4. Start building your domain features

## Project Structure

```
SAAS-Bootstrap/
├── docs/              # Architecture and product documentation
├── prisma/            # Prisma schema and migrations
│   └── schema.prisma  # Database schema definition
├── prisma.config.js   # Prisma 7 configuration (database URL)
├── docker-compose.yml # PostgreSQL Docker configuration
├── .nvmrc             # Node.js version specification
└── README.md
```
