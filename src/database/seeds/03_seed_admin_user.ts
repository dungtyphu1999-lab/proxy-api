import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';
import { User, UserProfile, UserRoleMap } from '../entities';

export async function seed(knex: Knex): Promise<void> {
  const adminUserId = '00000000-0000-0000-0000-000000000001';
  const adminRoleId = '00000000-0000-0000-0000-000000000001';

  const adminEmail = String(process.env.ADMIN_EMAIL || '').trim();
  const adminUsername = String(process.env.ADMIN_USERNAME || '').trim();
  const adminPassword = String(process.env.ADMIN_PASSWORD || '').trim();

  if (!adminEmail || !adminUsername || !adminPassword) {
    throw new Error(
      'Missing admin seed envs. Please set ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD.',
    );
  }

  // Prefer looking up by fixed admin id; this lets us safely "rename" the admin email
  // across environments without leaving a stale admin@nezhub.com behind.
  const existingById = await knex<User>('users').where('id', adminUserId).first();
  const existingByEmail = await knex<User>('users')
    .where('email', adminEmail)
    .first();

  if (!existingById && existingByEmail) {
    console.log('Admin email already exists but admin id is not the default seed id.');
    console.log(`Existing admin email: ${adminEmail}`);
    console.log('Skip creating default admin user to avoid email conflict.');
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  if (!existingById) {
    // Insert admin user
    await knex<User>('users').insert({
      id: adminUserId,
      email: adminEmail,
      username: adminUsername,
      password_hash: hashedPassword,
      is_verified: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Insert admin user profile
    await knex<UserProfile>('user_profiles').insert({
      user_id: adminUserId,
      full_name: 'Admin User',
    });

    // Assign admin role to user
    await knex<UserRoleMap>('user_role_map').insert({
      user_id: adminUserId,
      role_id: adminRoleId,
      assigned_at: new Date(),
    });

    console.log('Admin user created successfully');
    console.log(`Email: ${adminEmail}`);
  } else {
    // Keep it idempotent: ensure credentials match desired config.
    await knex<User>('users')
      .where('id', adminUserId)
      .update({
        email: adminEmail,
        username: adminUsername,
        password_hash: hashedPassword,
        updated_at: new Date(),
      });

    // Ensure profile exists
    const existingProfile = await knex<UserProfile>('user_profiles')
      .where('user_id', adminUserId)
      .first();
    if (!existingProfile) {
      await knex<UserProfile>('user_profiles').insert({
        user_id: adminUserId,
        full_name: 'Admin User',
      });
    }

    // Ensure role map exists
    const existingRoleMap = await knex<UserRoleMap>('user_role_map')
      .where('user_id', adminUserId)
      .where('role_id', adminRoleId)
      .first();
    if (!existingRoleMap) {
      await knex<UserRoleMap>('user_role_map').insert({
        user_id: adminUserId,
        role_id: adminRoleId,
        assigned_at: new Date(),
      });
    }

    console.log('Admin user updated successfully');
    console.log(`Email: ${adminEmail}`);
  }
}
