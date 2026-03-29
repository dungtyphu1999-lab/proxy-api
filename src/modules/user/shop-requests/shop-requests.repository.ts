import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import { ShopRequest } from '@/database/entities/shop-request.entity';

@Injectable()
export class ShopRequestsRepository extends BaseRepository<ShopRequest> {
  constructor() {
    super('shop_requests');
  }

  async createShopRequest(userId: string, payload: Partial<ShopRequest>) {
    const requestData = {
      ...payload,
      user_id: userId,
      status: 'pending' as const,
    };

    const [createdRequest] = await this.qb.insert(requestData).returning('*');
    return createdRequest;
  }

  async updateShopRequest(id: string, payload: Partial<ShopRequest>) {
    const [updated] = await this.qb
      .where('id', id)
      .update({
        ...payload,
        status: 'pending' as const,
        updated_at: new Date(),
      })
      .returning('*');

    return updated || null;
  }

  async findByUserId(userId: string) {
    return await this.qb.where('user_id', userId).orderBy('created_at', 'desc');
  }

  async findPendingRequestByUserId(userId: string) {
    const request = await this.qb
      .where('user_id', userId)
      .where('status', 'pending')
      .first();
    return request || null;
  }

  async findRejectRequestByUserId(userId: string) {
    const request = await this.qb
      .where('user_id', userId)
      .where('status', 'rejected')
      .first();
    return request || null;
  }

  async findLatestByUserId(userId: string) {
    const request = await this.qb
      .where('user_id', userId)
      .orderBy('created_at', 'desc')
      .first();
    return request || null;
  }

  async findById(id: string) {
    const req = await this.qb.where('id', id).first();
    return req || null;
  }
}
