import { z } from 'zod';

// Boost display position enum
export const BoostDisplayPositionSchema = z.enum([
  'all',
  'product_list',
  'product_new',
  'product_suggestions',
  'best_of_week_list',
  'best_of_day_list',
  'best_of_month_list',
]);

export type BoostDisplayPosition = z.infer<typeof BoostDisplayPositionSchema>;

// Boost Package Version schema
export const BoostPackageVersionSchema = z.object({
  id: z.uuid(),
  package_id: z.uuid(),
  version_no: z.number().int().positive(),
  name: z.string().min(1).max(255),
  duration_days: z.number().int().positive(),
  price: z.number().nonnegative(),
  display_position: BoostDisplayPositionSchema.default('all'),
  description: z.string().optional(),
  created_at: z.date(),
});

export type BoostPackageVersion = z.infer<typeof BoostPackageVersionSchema>;

// Boost Package schema
export const BoostPackageSchema = z.object({
  id: z.uuid(),
  is_active: z.boolean().default(true),
  current_version_id: z.uuid().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type BoostPackage = z.infer<typeof BoostPackageSchema>;

// Extended schemas with relationships
export const BoostPackageWithVersionSchema = BoostPackageSchema.extend({
  current_version: BoostPackageVersionSchema.optional(),
  versions: z.array(BoostPackageVersionSchema).optional(),
});

export type BoostPackageWithVersion = z.infer<
  typeof BoostPackageWithVersionSchema
>;

export const BoostPackageWithCurrentVersionSchema = BoostPackageSchema.extend({
  current_version: BoostPackageVersionSchema,
});

export type BoostPackageWithCurrentVersion = z.infer<
  typeof BoostPackageWithCurrentVersionSchema
>;

export const BoostPackageVersionWithPackageSchema =
  BoostPackageVersionSchema.extend({
    package: BoostPackageSchema.optional(),
  });

export type BoostPackageVersionWithPackage = z.infer<
  typeof BoostPackageVersionWithPackageSchema
>;
