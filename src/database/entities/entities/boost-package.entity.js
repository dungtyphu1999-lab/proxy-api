"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoostPackageVersionWithPackageSchema = exports.BoostPackageWithCurrentVersionSchema = exports.BoostPackageWithVersionSchema = exports.BoostPackageSchema = exports.BoostPackageVersionSchema = exports.BoostDisplayPositionSchema = void 0;
var zod_1 = require("zod");
// Boost display position enum
exports.BoostDisplayPositionSchema = zod_1.z.enum([
    'all',
    'product_list',
    'product_new',
    'product_suggestions',
    'best_of_week_list',
    'best_of_day_list',
    'best_of_month_list',
]);
// Boost Package Version schema
exports.BoostPackageVersionSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    package_id: zod_1.z.uuid(),
    version_no: zod_1.z.number().int().positive(),
    name: zod_1.z.string().min(1).max(255),
    duration_days: zod_1.z.number().int().positive(),
    price: zod_1.z.number().nonnegative(),
    display_position: exports.BoostDisplayPositionSchema.default('all'),
    description: zod_1.z.string().optional(),
    created_at: zod_1.z.date(),
});
// Boost Package schema
exports.BoostPackageSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    is_active: zod_1.z.boolean().default(true),
    current_version_id: zod_1.z.uuid().optional(),
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
});
// Extended schemas with relationships
exports.BoostPackageWithVersionSchema = exports.BoostPackageSchema.extend({
    current_version: exports.BoostPackageVersionSchema.optional(),
    versions: zod_1.z.array(exports.BoostPackageVersionSchema).optional(),
});
exports.BoostPackageWithCurrentVersionSchema = exports.BoostPackageSchema.extend({
    current_version: exports.BoostPackageVersionSchema,
});
exports.BoostPackageVersionWithPackageSchema = exports.BoostPackageVersionSchema.extend({
    package: exports.BoostPackageSchema.optional(),
});
