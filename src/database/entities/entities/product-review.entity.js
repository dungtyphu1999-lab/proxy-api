"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewSchema = exports.ProductReviewStatusSchema = void 0;
var zod_1 = require("zod");
exports.ProductReviewStatusSchema = zod_1.z.enum([
    'pending',
    'approved',
    'rejected',
]);
exports.ProductReviewSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    product_id: zod_1.z.uuid(),
    user_id: zod_1.z.uuid(),
    shop_id: zod_1.z.uuid(),
    parent_review_id: zod_1.z.uuid().nullable(),
    content: zod_1.z.string(),
    rating: zod_1.z.number().int().min(1).max(5),
    status: exports.ProductReviewStatusSchema,
    like_count: zod_1.z.number().int().min(0),
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
});
