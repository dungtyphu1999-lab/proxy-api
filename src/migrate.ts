import * as Knex from 'knex';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const isCompiled = __filename.endsWith('.js');
const ext = isCompiled ? 'js' : 'ts';

const migrDir = path.join(__dirname, 'database', 'migrations');

const config = {
  client: process.env.DB_CLIENT || 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'postgres',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  },
  migrations: {
    directory: migrDir,
    loadExtensions: ['.' + ext],
  },
};

console.log('[migrate] Starting migration runner');
console.log('[migrate] DB Host:', process.env.DB_HOST || '(not set - using localhost)');
console.log('[migrate] Migration dir:', migrDir);
console.log('[migrate] Extension:', ext);

// Check if directory exists and list files
if (fs.existsSync(migrDir)) {
  const files = fs.readdirSync(migrDir).filter(f => f.endsWith('.' + ext));
  console.log(`[migrate] Found ${files.length} migration files`);
  if (files.length > 0) {
    console.log('[migrate] First 3:', files.slice(0, 3).join(', '));
  }
} else {
  console.error('[migrate] ERROR: Migration directory does not exist:', migrDir);
  console.log('[migrate] Contents of __dirname:', fs.readdirSync(__dirname).slice(0, 10).join(', '));
  process.exit(1);
}

const knex = (Knex as any).default ? (Knex as any).default(config) : (Knex as any)(config);

knex.migrate
  .latest()
  .then(([batchNo, log]: [number, string[]]) => {
    if (log.length === 0) {
      console.log('[migrate] Already up to date (no new migrations)');
    } else {
      console.log(`[migrate] Batch ${batchNo}: ran ${log.length} migration(s)`);
      log.forEach((m) => console.log(' -', m));
    }
    return knex.destroy();
  })
  .then(() => {
    console.log('[migrate] Done');
    process.exit(0);
  })
  .catch((err: Error) => {
    console.error('[migrate] FAILED:', err.message);
    console.error(err.stack);
    process.exit(1);
  });

