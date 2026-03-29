"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemWalletTransactionSchema = exports.TransactionStatusSchema = exports.SystemTransactionTypeSchema = void 0;
var zod_1 = require("zod");
exports.SystemTransactionTypeSchema = zod_1.z.enum([
    'deposit',
    'release',
    'refund',
    'commission_collect',
    'penalty',
    'boost_payment',
]);
exports.TransactionStatusSchema = zod_1.z.enum([
    'pending',
    'success',
    'failed',
    'cancelled',
]);
exports.SystemWalletTransactionSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    system_wallet_id: zod_1.z.uuid(),
    from_wallet_id: zod_1.z.uuid().optional(),
    to_wallet_id: zod_1.z.uuid().optional(),
    transaction_type: exports.SystemTransactionTypeSchema,
    amount: zod_1.z.number().nonnegative(),
    status: exports.TransactionStatusSchema.default('pending'),
    notes: zod_1.z.string().optional(),
    processed_by: zod_1.z.uuid().optional(),
    created_at: zod_1.z.date(),
    processed_at: zod_1.z.date().optional(),
});
