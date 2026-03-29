import { z } from 'zod';

export const AppConfigSchema = z.object({
  port: z.number().default(3000),
  publicUrl: z.string(),
  corsOrigins: z.string().array(),
});

export const RedisConfigSchema = z.object({
  host: z.string().default('localhost'),
  port: z.number().default(6379),
  password: z.string().optional(),
});

export const DbConfigSchema = z.object({
  client: z.string().default('pg'),
  host: z.string().default('localhost'),
  port: z.number().default(5432),
  user: z.string().default('your_db_user'),
  password: z.string().default('your_db_password'),
  name: z.string().default('your_db_name'),
});

export const JwtConfigSchema = z.object({
  secret: z.string().default('secret'),
  expiresIn: z.string().default('15m'),
  refreshTokenExpiresIn: z.string().default('30d'),
});

export const EmailConfigSchema = z.object({
  noReplyEmail: z
    .email()
    .default(process.env.MAIL_NO_REPLY_FROM_EMAIL || 'support@bachhoammo.net'),
  noReplyFromName: z
    .string()
    .default(process.env.MAIL_NO_REPLY_FROM_NAME || 'BACHHOAMMO'),
  supportEmail: z
    .email()
    .default(process.env.MAIL_SUPPORT_FROM_EMAIL || 'support@bachhoammo.net'),
  supportFromName: z
    .string()
    .default(process.env.MAIL_SUPPORT_FROM_NAME || 'BACHHOAMMO'),
});

export const BlogViewConfigSchema = z.object({
  uniqueMinutes: z.number().default(5),
});

export const EkycConfigSchema = z.object({
  apiBankList: z.string(),
  apiBankLookup: z.string(),
  apiKey: z.string(),
  apiSecret: z.string(),
});

export const Pay2sConfigSchema = z.object({
  qrLink: z.string().optional(),
  bankCode: z.string().optional(),
  bankNumber: z.string().optional(),
  bankName: z.string().optional(),
  webhookSecretKey: z.string().optional(),
});

export const LoggerConfigSchema = z.object({
  verbose: z.boolean().default(false),
});

export const OAuthConfigSchema = z.object({
  google: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
  }),
  facebook: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
  }),
});

export const ConfigValidationSchema = z.object({
  app: AppConfigSchema,
  redis: RedisConfigSchema,
  database: DbConfigSchema,
  jwt: JwtConfigSchema,
  email: EmailConfigSchema,
  blogView: BlogViewConfigSchema,
  ekyc: EkycConfigSchema,
  pay2s: Pay2sConfigSchema,
  logger: LoggerConfigSchema,
  oauth: OAuthConfigSchema,
});

export type ConfigValidation = z.infer<typeof ConfigValidationSchema>;
