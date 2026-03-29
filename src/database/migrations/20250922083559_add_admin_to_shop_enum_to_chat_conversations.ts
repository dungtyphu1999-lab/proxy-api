import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // 1. Drop old check constraint
  await knex.raw(`
    ALTER TABLE chat_conversations
    DROP CONSTRAINT IF EXISTS chat_conversations_type_check;
  `);

  // 2. Add new check constraint with the additional value
  await knex.raw(`
    ALTER TABLE chat_conversations
    ADD CONSTRAINT chat_conversations_type_check
    CHECK (
      type = ANY (
        ARRAY[
          'user_to_user'::text,
          'user_to_shop'::text,
          'user_to_admin'::text,
          'admin_to_user'::text,
          'admin_to_shop'::text
        ]
      )
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  // revert back to the old check
  await knex.raw(`
    ALTER TABLE chat_conversations
    DROP CONSTRAINT IF EXISTS chat_conversations_type_check;
  `);

  await knex.raw(`
    ALTER TABLE chat_conversations
    ADD CONSTRAINT chat_conversations_type_check
    CHECK (
      type = ANY (
        ARRAY[
          'user_to_user'::text,
          'user_to_shop'::text,
          'user_to_admin'::text,
          'admin_to_user'::text
        ]
      )
    );
  `);
}
