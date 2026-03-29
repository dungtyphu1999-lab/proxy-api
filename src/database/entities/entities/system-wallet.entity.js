"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemWalletSchema = exports.SystemWalletStatusSchema = exports.SystemWalletTypeSchema = void 0;
var zod_1 = require("zod");
exports.SystemWalletTypeSchema = zod_1.z.enum([
    'escrow',
    'commission',
    'penalty',
    'refund_reserve',
    'shop_boost',
]);
exports.SystemWalletStatusSchema = zod_1.z.enum([
    'active',
    'locked',
    'processing',
    'closed',
]);
exports.SystemWalletSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    wallet_type: exports.SystemWalletTypeSchema,
    reference_type: zod_1.z.string().max(30).optional(),
    reference_id: zod_1.z.uuid().optional(),
    holder_user_id: zod_1.z.uuid().optional(),
    balance: zod_1.z.number().nonnegative().default(0),
    reserved_amount: zod_1.z.number().nonnegative().default(0),
    available_amount: zod_1.z.number(),
    currency: zod_1.z.string().max(10).default('VND'),
    status: exports.SystemWalletStatusSchema.default('active'),
    auto_release_at: zod_1.z.date().optional(),
    notes: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.any(), zod_1.z.any()).optional(),
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
    closed_at: zod_1.z.date().optional(),
});
