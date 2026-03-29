import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT || '3001', 10),
  publicUrl: process.env.PUBLIC_URL || 'http://localhost:8081',
  // Normalize to avoid subtle mismatches (whitespace, trailing slash, empty items).
  corsOrigins: (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/\/$/, '')),
}));
