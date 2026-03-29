import { Knex } from 'knex';

// Thêm interface để type safety
interface FaqRow {
  id?: string | number;
  question: string;
  answer: string;
  is_active: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export async function up(knex: Knex): Promise<void> {
  // 1. Tạo table backup
  await knex.schema.raw(`
    CREATE TABLE faqs_backup AS 
    SELECT * FROM faqs;
  `);

  // 2. Drop existing table
  await knex.schema.dropTable('faqs');

  // 3. Tạo lại table với UUID
  await knex.schema.createTable('faqs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.text('question').notNullable();
    table.text('answer').notNullable();
    table.boolean('is_active').defaultTo(true);
    table.integer('sort_order').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes for better performance
    table.index(['is_active']);
    table.index(['sort_order']);
    table.index(['created_at']);
  });

  // 4. Migrate data từ backup với UUID mới
  const backupData = (await knex('faqs_backup').select('*')) as FaqRow[];

  if (backupData.length > 0) {
    const dataWithUuid = backupData.map((row) => ({
      question: row.question,
      answer: row.answer,
      is_active: row.is_active,
      sort_order: row.sort_order,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    await knex('faqs').insert(dataWithUuid);
  }

  // 5. Drop backup table
  await knex.schema.dropTable('faqs_backup');
}

export async function down(knex: Knex): Promise<void> {
  // Backup current data
  await knex.schema.raw(`
    CREATE TABLE faqs_backup AS 
    SELECT * FROM faqs;
  `);

  // Drop current table
  await knex.schema.dropTable('faqs');

  // Recreate with incremental ID
  await knex.schema.createTable('faqs', (table) => {
    table.increments('id').primary();
    table.text('question').notNullable();
    table.text('answer').notNullable();
    table.boolean('is_active').defaultTo(true);
    table.integer('sort_order').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // Migrate data back
  const backupData = (await knex('faqs_backup').select('*')) as FaqRow[];

  if (backupData.length > 0) {
    const dataWithoutUuid = backupData.map((row) => ({
      question: row.question,
      answer: row.answer,
      is_active: row.is_active,
      sort_order: row.sort_order,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    await knex('faqs').insert(dataWithoutUuid);
  }

  // Clean up
  await knex.schema.dropTable('faqs_backup');
}
