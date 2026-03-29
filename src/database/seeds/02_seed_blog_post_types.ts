import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const blogPostTypes = await knex('blog_post_types').select('id');
  if (blogPostTypes.length > 0) {
    return;
  }

  await knex('blog_post_types').insert([
    {
      id: 1,
      name: 'Chia sẻ',
      description: 'Chia sẻ kinh nghiệm, kiến thức, thông tin hữu ích',
      sort_order: 1,
      is_active: true,
    },
    {
      id: 2,
      name: 'Tìm sản phẩm',
      description: 'Tìm kiếm sản phẩm cần mua',
      sort_order: 2,
      is_active: true,
    },
    {
      id: 3,
      name: 'Tìm dịch vụ',
      description: 'Tìm kiếm dịch vụ cần sử dụng',
      sort_order: 3,
      is_active: true,
    },
    {
      id: 4,
      name: 'Hỏi đáp',
      description: 'Đặt câu hỏi và nhận câu trả lời từ cộng đồng',
      sort_order: 4,
      is_active: true,
    },
  ]);
}
