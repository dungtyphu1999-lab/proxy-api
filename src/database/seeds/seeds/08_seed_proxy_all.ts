import type { Knex } from 'knex';
import { seed as seedProxyProducts } from './proxy/08_seed_proxy_products_and_options';
import { seed as seedProxyLocations } from './proxy/09_seed_proxy_locations';
import { seed as seedProxyFeatures } from './proxy/10_seed_proxy_additional_features';

/**
 * Gộp tất cả seed proxy.
 *
 * Thứ tự:
 * 1. Products + options
 * 2. Locations
 * 3. Additional features
 *
 * Chạy 1 lần: pnpm run knex:seed (hoặc chỉ chạy file này nếu Knex hỗ trợ seed cụ thể).
 */
export async function seed(knex: Knex): Promise<void> {
  await seedProxyProducts(knex);
  await seedProxyLocations(knex);
  await seedProxyFeatures(knex);
}
