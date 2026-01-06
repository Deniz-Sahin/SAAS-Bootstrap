// Load environment variables from .env file
const fs = require('fs');
const path = require('path');

// Load .env file manually if dotenv isn't available
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL environment variable is not set. Please ensure your .env file contains:\n' +
    'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/saas_bootstrap?schema=public"'
  );
}

module.exports = {
  datasource: {
    url: databaseUrl,
  },
};
