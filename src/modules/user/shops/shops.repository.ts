import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import { Shop } from '@/database/entities/shop.entity';
import { Category } from '@/database/entities/category.entity';
import { ShopWithRequestInfo } from './types';

type ProductSuggestionBase = {
  id: string;
  slug: string;
  name: string;
  price: number;
  discount_percent: number;
  is_free: boolean;
  description: string | null;
  rating_avg: number;
  total_sales: number;
  total_review: number;
  total_view: number;
  thumbnail: string | null;
  category_name: string | null;
  category_slug: string | null;
  subcategory_name: string | null;
  subcategory_slug: string | null;
  is_sponsored: boolean;
  shop_name: string;
  shop_slug: string;
  shop_avatar_url?: string | null;
  verified: boolean;
  created_at?: Date;
  updated_at?: Date;
  price_min_max?: string;
  total_quantity?: number;
};
@Injectable()
export class ShopsRepository extends BaseRepository<Shop> {
  constructor() {
    super('shops');
  }

  async findById(id: string): Promise<Shop | null> {
    const shop = await this.qb.where('id', id).first();
    return shop || null;
  }

  async createShop(ownerId: string, payload: Partial<Shop>): Promise<Shop> {
    const shopData = {
      ...payload,
      owner_id: ownerId,
    };

    const [createdShop] = await this.qb.insert(shopData).returning('*');
    return createdShop;
  }

  async findShopDetailByOwnerId(ownerId: string): Promise<ShopWithRequestInfo> {
    const result = await this.qb
      .leftJoin('shop_requests', 'shops.shop_request_id', 'shop_requests.id')
      .select(
        'shops.*',
        'shop_requests.front_id_url as front_id_url',
        'shop_requests.back_id_url as back_id_url',
        'shop_requests.bank_code as bank_code',
        'shop_requests.bank_name as bank_name',
        'shop_requests.status as status',
        'shop_requests.bank_account_number as bank_account_number',
        'shop_requests.bank_account_name as bank_account_name',
      )
      .where('shops.owner_id', ownerId)
      .first<ShopWithRequestInfo>();

    return result || null;
  }

  async findShopByOwnerId(ownerId: string): Promise<Shop> {
    const result = await this.qb.where('owner_id', ownerId).first<Shop>();

    return result || null;
  }

  async getShopOwnerByShopId(shopId: string): Promise<Shop | null> {
    const shop = await this.qb
      .select('*')
      .from('shops')
      .where('id', shopId)
      .first<Shop>();

    return shop || null;
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const row = await this.qb
      .select('id')
      .whereRaw('LOWER(unaccent(slug)) = LOWER(unaccent(?))', [slug])
      .first();
    return !!row;
  }
}
