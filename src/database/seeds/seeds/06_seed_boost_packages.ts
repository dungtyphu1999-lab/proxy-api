import { Knex } from 'knex';
import { BoostPackage } from '../entities/boost-package.entity';

export async function seed(knex: Knex): Promise<void> {
  // Check if boost packages already exist
  const existingPackages = await knex<BoostPackage>('boost_packages').first();
  if (existingPackages) {
    return;
  }

  // Create boost packages and their versions
  const packages = [
    {
      name: 'Gói Cơ Bản',
      price: 100000,
      duration_days: 3,
      description:
        'Vị trí hiển thị: Ưu tiên toàn nền tảng\nPhù hợp với: Sản phẩm mới, cần test thị trường nhanh',
    },
    {
      name: 'Gói Nâng Cao',
      price: 160000,
      duration_days: 7,
      description:
        'Vị trí hiển thị: Ưu tiên toàn nền tảng\nPhù hợp với: Sản phẩm đang chạy khuyến mãi hoặc cần tăng tốc bán hàng',
    },
    {
      name: 'Gói Tối Ưu',
      price: 240000,
      duration_days: 14,
      description:
        'Vị trí hiển thị: Ưu tiên toàn nền tảng\nPhù hợp với: Sản phẩm chủ lực, cần tăng doanh thu mạnh',
    },
  ];

  for (const packageData of packages) {
    // Create boost package
    const [packageId] = await knex('boost_packages')
      .insert({
        id: knex.raw('gen_random_uuid()'),
        is_active: true,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      })
      .returning<{ id: string }[]>('id');

    // Create boost package version
    const [versionId] = await knex('boost_package_versions')
      .insert({
        id: knex.raw('gen_random_uuid()'),
        package_id: packageId.id,
        version_no: 1,
        name: packageData.name,
        duration_days: packageData.duration_days,
        price: packageData.price,
        display_position: 'all',
        description: packageData.description,
        created_at: knex.fn.now(),
      })
      .returning<{ id: string }[]>('id');

    // Update boost package with current_version_id
    await knex('boost_packages').where('id', packageId.id).update({
      current_version_id: versionId.id,
      updated_at: knex.fn.now(),
    });
  }
}
