"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductBoostUsageLogSchema = exports.BoostEventTypeSchema = void 0;
var zod_1 = require("zod");
exports.BoostEventTypeSchema = zod_1.z.enum(['impression', 'click', 'cta']);
exports.ProductBoostUsageLogSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    boost_purchase_id: zod_1.z.uuid(),
    product_id: zod_1.z.uuid(),
    shop_id: zod_1.z.uuid(),
    event_type: exports.BoostEventTypeSchema,
    user_id: zod_1.z.uuid().optional(),
    ip_address: zod_1.z.string().optional(),
    user_agent: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.any(), zod_1.z.any()).optional(),
    created_at: zod_1.z.date(),
});
