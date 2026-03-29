import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  client: process.env.DB_CLIENT || 'pg',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'your_db_user',
  password: process.env.DB_PASSWORD || 'your_db_password',
  name: process.env.DB_NAME || 'your_db_name',
}));
