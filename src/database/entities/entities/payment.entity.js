"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchema = exports.PaymentReferenceTypeSchema = exports.PaymentMethodSchema = exports.PaymentStatusSchema = void 0;
var zod_1 = require("zod");
exports.PaymentStatusSchema = zod_1.z.enum([
    'pending',
    'processing',
    'paid',
    'failed',
    'refunded',
    'cancelled',
]);
exports.PaymentMethodSchema = zod_1.z.enum([
    'wallet',
    'bank_transfer',
    'credit_card',
    'paypal',
    'momo',
    'other',
]);
exports.PaymentReferenceTypeSchema = zod_1.z.enum(['order', 'product_boost']);
exports.PaymentSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    payment_code: zod_1.z.string().max(30),
    reference_type: exports.PaymentReferenceTypeSchema,
    reference_id: zod_1.z.uuid(),
    payer_id: zod_1.z.uuid(),
    payee_id: zod_1.z.uuid().optional(),
    system_wallet_id: zod_1.z.uuid().optional(),
    amount: zod_1.z.number().nonnegative(),
    currency: zod_1.z.string().max(10).default('VND'),
    method: exports.PaymentMethodSchema,
    status: exports.PaymentStatusSchema.default('pending'),
    metadata: zod_1.z.record(zod_1.z.any(), zod_1.z.any()).optional(),
    note: zod_1.z.string().optional(),
    created_at: zod_1.z.date(),
    paid_at: zod_1.z.date().optional(),
    updated_at: zod_1.z.date(),
});
