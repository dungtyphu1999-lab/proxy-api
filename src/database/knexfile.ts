import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Detect if running from compiled dist (JS) or source (TS)
const isCompiled = __filename.endsWith('.js');
const migrationExt = isCompiled ? 'js' : 'ts';

const baseConfig = {
  client: process.env.DB_CLIENT || 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'your_db_user',
    password: process.env.DB_PASSWORD || 'your_db_password',
    database: process.env.DB_NAME || 'your_db_name',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './migrations',
    extension: migrationExt,
    loadExtensions: ['.' + migrationExt],
  },
  seeds: {
    directory: './seeds',
    extension: migrationExt,
    loadExtensions: ['.' + migrationExt],
  },
};

const config: { [key: string]: Knex.Config } = {
  development: {
    ...baseConfig,
    debug: process.env.DB_DEBUG === 'true',
  },
  production: {
    ...baseConfig,
  },
};

export default config;
