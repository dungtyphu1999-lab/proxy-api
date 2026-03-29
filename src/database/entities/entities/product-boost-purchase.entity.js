"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductBoostPurchaseSchema = exports.ProductBoostPurchaseStatusSchema = void 0;
var zod_1 = require("zod");
exports.ProductBoostPurchaseStatusSchema = zod_1.z.enum([
    'pending',
    'active',
    'expired',
    'cancelled',
]);
exports.ProductBoostPurchaseSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    product_id: zod_1.z.uuid(),
    shop_id: zod_1.z.uuid(),
    owner_id: zod_1.z.uuid(),
    package_version_id: zod_1.z.uuid(),
    price: zod_1.z.number().nonnegative(),
    start_at: zod_1.z.date(),
    end_at: zod_1.z.date(),
    status: exports.ProductBoostPurchaseStatusSchema,
    created_at: zod_1.z.date(),
});
