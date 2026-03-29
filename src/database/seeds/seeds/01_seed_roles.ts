import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const roles = await knex('roles').select('id');
  if (roles.length > 0) {
    return;
  }
  await knex('roles').insert([
    { id: '00000000-0000-0000-0000-000000000001', name: 'admin' },
    { id: '00000000-0000-0000-0000-000000000002', name: 'user' },
    { id: '00000000-0000-0000-0000-000000000003', name: 'moderator' },
  ]);
}
