"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigValidationSchema = exports.OAuthConfigSchema = exports.LoggerConfigSchema = exports.Pay2sConfigSchema = exports.EkycConfigSchema = exports.BlogViewConfigSchema = exports.EmailConfigSchema = exports.JwtConfigSchema = exports.DbConfigSchema = exports.RedisConfigSchema = exports.AppConfigSchema = void 0;
var zod_1 = require("zod");
exports.AppConfigSchema = zod_1.z.object({
    port: zod_1.z.number().default(3000),
    publicUrl: zod_1.z.string(),
    corsOrigins: zod_1.z.string().array(),
});
exports.RedisConfigSchema = zod_1.z.object({
    host: zod_1.z.string().default('localhost'),
    port: zod_1.z.number().default(6379),
    password: zod_1.z.string().optional(),
});
exports.DbConfigSchema = zod_1.z.object({
    client: zod_1.z.string().default('pg'),
    host: zod_1.z.string().default('localhost'),
    port: zod_1.z.number().default(5432),
    user: zod_1.z.string().default('your_db_user'),
    password: zod_1.z.string().default('your_db_password'),
    name: zod_1.z.string().default('your_db_name'),
});
exports.JwtConfigSchema = zod_1.z.object({
    secret: zod_1.z.string().default('secret'),
    expiresIn: zod_1.z.string().default('15m'),
    refreshTokenExpiresIn: zod_1.z.string().default('30d'),
});
exports.EmailConfigSchema = zod_1.z.object({
    noReplyEmail: zod_1.z
        .email()
        .default(process.env.MAIL_NO_REPLY_FROM_EMAIL || 'support@bachhoammo.net'),
    noReplyFromName: zod_1.z
        .string()
        .default(process.env.MAIL_NO_REPLY_FROM_NAME || 'BACHHOAMMO'),
    supportEmail: zod_1.z
        .email()
        .default(process.env.MAIL_SUPPORT_FROM_EMAIL || 'support@bachhoammo.net'),
    supportFromName: zod_1.z
        .string()
        .default(process.env.MAIL_SUPPORT_FROM_NAME || 'BACHHOAMMO'),
});
exports.BlogViewConfigSchema = zod_1.z.object({
    uniqueMinutes: zod_1.z.number().default(5),
});
exports.EkycConfigSchema = zod_1.z.object({
    apiBankList: zod_1.z.string(),
    apiBankLookup: zod_1.z.string(),
    apiKey: zod_1.z.string(),
    apiSecret: zod_1.z.string(),
});
exports.Pay2sConfigSchema = zod_1.z.object({
    qrLink: zod_1.z.string().optional(),
    bankCode: zod_1.z.string().optional(),
    bankNumber: zod_1.z.string().optional(),
    bankName: zod_1.z.string().optional(),
    webhookSecretKey: zod_1.z.string().optional(),
});
exports.LoggerConfigSchema = zod_1.z.object({
    verbose: zod_1.z.boolean().default(false),
});
exports.OAuthConfigSchema = zod_1.z.object({
    google: zod_1.z.object({
        clientId: zod_1.z.string(),
        clientSecret: zod_1.z.string(),
    }),
    facebook: zod_1.z.object({
        clientId: zod_1.z.string(),
        clientSecret: zod_1.z.string(),
    }),
});
exports.ConfigValidationSchema = zod_1.z.object({
    app: exports.AppConfigSchema,
    redis: exports.RedisConfigSchema,
    database: exports.DbConfigSchema,
    jwt: exports.JwtConfigSchema,
    email: exports.EmailConfigSchema,
    blogView: exports.BlogViewConfigSchema,
    ekyc: exports.EkycConfigSchema,
    pay2s: exports.Pay2sConfigSchema,
    logger: exports.LoggerConfigSchema,
    oauth: exports.OAuthConfigSchema,
});
