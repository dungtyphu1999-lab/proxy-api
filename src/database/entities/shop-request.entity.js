"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRequestSchema = void 0;
var zod_1 = require("zod");
exports.ShopRequestSchema = zod_1.z.object({
    id: zod_1.z.string(),
    shop_name: zod_1.z.string(),
    user_id: zod_1.z.string(),
    front_id_url: zod_1.z.string(),
    back_id_url: zod_1.z.string(),
    bank_code: zod_1.z.string(),
    bank_name: zod_1.z.string(),
    bank_account_number: zod_1.z.string(),
    bank_account_name: zod_1.z.string(),
    bank_status: zod_1.z.enum(['valid', 'invalid', 'unknown']).default('unknown'),
    status: zod_1.z.enum(['pending', 'approved', 'rejected']).default('pending'),
    note: zod_1.z.string().optional(),
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
});
