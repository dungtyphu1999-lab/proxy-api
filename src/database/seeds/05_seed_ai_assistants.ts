import { Knex } from 'knex';
import { AIAssistant } from '../entities/ai_assistant.entity';

export async function seed(knex: Knex): Promise<void> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY in environment variables');
  }

  const existing: AIAssistant | undefined = await knex<AIAssistant>(
    'ai_assistants',
  )
    .whereILike('provider', '%openai%')
    .first();

  if (existing) {
    return;
  }

  await knex('ai_assistants').insert([
    {
      id: knex.raw('gen_random_uuid()'),
      provider: 'openai',
      model: 'gpt-4o-mini',
      api_key: apiKey,
      description: 'Trợ lý ChatGPT hỗ trợ tìm kiếm sản phẩm số.',
      is_active: true,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
