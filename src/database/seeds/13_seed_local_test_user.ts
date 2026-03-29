import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

/**
 * Local/dev helper seed: upsert a test user for QA.
 *
 * Env:
 * - LOCAL_TEST_USER_EMAIL (required)
 * - LOCAL_TEST_USER_PASSWORD (required)
 * - LOCAL_TEST_USER_USERNAME (optional)
 * - LOCAL_TEST_USER_FULL_NAME (optional)
 */
export async function seed(knex: Knex): Promise<void> {
  const env = process.env.APP_ENV || process.env.NODE_ENV || 'development';
  if (env === 'production') return;

  const email = String(process.env.LOCAL_TEST_USER_EMAIL || '').trim();
  const password = String(process.env.LOCAL_TEST_USER_PASSWORD || '').trim();
  const username = String(
    process.env.LOCAL_TEST_USER_USERNAME || 'user_local_test',
  ).trim();
  const fullName = String(
    process.env.LOCAL_TEST_USER_FULL_NAME || 'Local Test User',
  ).trim();

  if (!email || !password) {
    console.log(
      'Local test user seed skipped: missing LOCAL_TEST_USER_EMAIL or LOCAL_TEST_USER_PASSWORD',
    );
    return;
  }

  const userRole = await knex('roles')
    .select('id')
    .where('name', 'user')
    .first<{ id: string }>();
  if (!userRole?.id) {
    console.log('Local test user seed skipped: role "user" not found');
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();

  const existing = await knex('users')
    .select('id')
    .where('email', email)
    .first<{ id: string }>();

  let userId = existing?.id;
  if (!userId) {
    userId = randomUUID();
    await knex('users').insert({
      id: userId,
      email,
      username,
      password_hash: passwordHash,
      is_verified: true,
      is_locked: false,
      is_online: false,
      has_received_welcome_message: true,
      created_at: now,
      updated_at: now,
    });
  } else {
    await knex('users').where('id', userId).update({
      email,
      username,
      password_hash: passwordHash,
      is_verified: true,
      is_locked: false,
      updated_at: now,
    });
  }

  const profileExists = await knex('user_profiles')
    .where('user_id', userId)
    .first();
  if (!profileExists) {
    await knex('user_profiles').insert({
      user_id: userId,
      full_name: fullName,
      username,
      is_profile_updated: true,
    });
  }

  const roleMapExists = await knex('user_role_map')
    .where('user_id', userId)
    .where('role_id', userRole.id)
    .first();
  if (!roleMapExists) {
    await knex('user_role_map').insert({
      id: randomUUID(),
      user_id: userId,
      role_id: userRole.id,
      assigned_at: now,
    });
  }

  console.log(`Local test user upserted: ${email}`);
}
