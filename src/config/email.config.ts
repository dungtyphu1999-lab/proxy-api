import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  // Config SMTP Gmail
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.MAIL_PORT ?? '587', 10),
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASSWORD, // App Password 16 ký tự
  secure: process.env.MAIL_SECURE === 'true', // false cho port 587
  encryption: process.env.MAIL_ENCRYPTION || 'tls', // 'tls' hoặc 'ssl'

  // Config From Email
  fromEmail: process.env.MAIL_NO_REPLY_FROM_EMAIL || 'support@bachhoammo.net',
  fromName: process.env.MAIL_NO_REPLY_FROM_NAME || 'BACHHOAMMO',
}));
