import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Add new status values to the order_complaints status enum
  // Find the enum type name by checking existing enum values
  const findEnumResult = (await knex.raw(`
    SELECT DISTINCT pg_type.typname as enum_name
    FROM pg_type
    JOIN pg_enum ON pg_enum.enumtypid = pg_type.oid
    WHERE pg_enum.enumlabel IN ('pending', 'investigating', 'resolved', 'closed', 'dismissed', 'shop_responded')
    AND pg_type.typtype = 'e'
    LIMIT 1;
  `)) as unknown as { rows: Array<{ enum_name: string }> };

  if (findEnumResult.rows && findEnumResult.rows.length > 0) {
    const enumName = findEnumResult.rows[0].enum_name;

    // Values to add: admin_review, rejected, cancelled
    const newValues = ['admin_review', 'rejected', 'cancelled'];

    for (const value of newValues) {
      // Check if value already exists
      const existsResult = (await knex.raw(
        `
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = ? 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = ?);
      `,
        [value, enumName],
      )) as unknown as { rows: Array<unknown> };

      if (!existsResult.rows || existsResult.rows.length === 0) {
        // Use string interpolation for enum name (safe because we control it from query result)
        // PostgreSQL doesn't support parameterized queries for ALTER TYPE
        await knex.raw(`ALTER TYPE "${enumName}" ADD VALUE '${value}';`);
      }
    }
  }
}

export async function down(knex: Knex): Promise<void> {
  // PostgreSQL doesn't support removing enum values directly
  // We would need to recreate the enum type, which is complex
  // For safety, we'll leave a comment about the rollback limitation
  await knex.raw(`
    -- Cannot remove enum values in PostgreSQL directly
    -- Would require recreating the enum and updating all dependent objects
    -- Manual rollback required if needed
    SELECT 1;
  `);
}
