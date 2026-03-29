import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import {
  OrderComplaint,
  ComplaintStatus,
  RESOLVED_STATUSES,
} from '@/database/entities/order-complaint.entity';
import {
  ComplaintStatusLog,
  ComplaintActorType,
} from '@/database/entities/complaint-status-log.entity';
import { Knex } from 'knex';

export interface CreateComplaintData {
  order_id: string;
  complainant_id: string;
  shop_id: string;
  type: string;
  title: string;
  description: string;
  evidence_images?: string[];
  reason_detail?: string;
  requested_resolution?: string;
  status: string;
  priority?: string;
}

export interface CreateStatusLogData {
  complaint_id: string;
  status: ComplaintStatus;
  actor_type: ComplaintActorType;
  actor_id?: string;
  message?: string;
  metadata?: Record<string, unknown>;
}

export interface OrderForComplaint {
  id: string;
  buyer_id: string;
  shop_id: string;
  status: string;
  created_at: Date;
  shop_name?: string;
  order_number?: string;
}

@Injectable()
export class OrderComplaintsRepository extends BaseRepository<OrderComplaint> {
  constructor() {
    super('order_complaints');
  }

  /**
   * Get order by ID with shop info for complaint validation
   */
  async getOrderForComplaint(
    orderId: string,
  ): Promise<OrderForComplaint | null> {
    const result = await this.knexInstance
      .select([
        'orders.id',
        'orders.buyer_id',
        'orders.shop_id',
        'orders.status',
        'orders.created_at',
        'orders.order_number',
        'shops.name as shop_name',
      ])
      .from('orders')
      .leftJoin('shops', 'orders.shop_id', 'shops.id')
      .where('orders.id', orderId)
      .first<OrderForComplaint | undefined>();

    return result ?? null;
  }

  /**
   * Check if order already has a complaint
   */
  async hasExistingComplaint(orderId: string): Promise<boolean> {
    const result = await this.qb.where('order_id', orderId).first();
    return !!result;
  }

  /**
   * Create complaint with transaction support
   */
  async createComplaint(
    data: CreateComplaintData,
    trx?: Knex.Transaction,
  ): Promise<OrderComplaint> {
    const query = trx ? trx<OrderComplaint>('order_complaints') : this.qb;

    const insertData: Record<string, unknown> = {
      order_id: data.order_id,
      complainant_id: data.complainant_id,
      shop_id: data.shop_id,
      type: data.type,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority || 'medium',
    };

    if (data.evidence_images && data.evidence_images.length > 0) {
      insertData.evidence_images = JSON.stringify(data.evidence_images);
    }

    if (data.reason_detail) {
      insertData.reason_detail = data.reason_detail;
    }

    if (data.requested_resolution) {
      insertData.requested_resolution = data.requested_resolution;
    }

    const [complaint] = await query.insert(insertData).returning('*');
    return complaint;
  }

  /**
   * Create status log
   */
  async createStatusLog(
    data: CreateStatusLogData,
    trx?: Knex.Transaction,
  ): Promise<ComplaintStatusLog> {
    const query = trx
      ? trx<ComplaintStatusLog>('complaint_status_logs')
      : this.knexInstance<ComplaintStatusLog>('complaint_status_logs');

    const [log] = await query.insert(data).returning('*');
    return log;
  }

  /**
   * Get complaint by ID with status logs
   */
  async getComplaintWithDetails(complaintId: string): Promise<{
    complaint: OrderComplaint;
    status_logs: ComplaintStatusLog[];
  } | null> {
    const complaint = await this.qb.where('id', complaintId).first();
    if (!complaint) return null;

    const status_logs = await this.knexInstance<ComplaintStatusLog>(
      'complaint_status_logs',
    )
      .where('complaint_id', complaintId)
      .orderBy('created_at', 'asc');

    return { complaint, status_logs };
  }

  /**
   * Count unresolved complaints for a shop
   */
  async countUnresolvedComplaintsForShop(
    shopId: string,
    trx?: Knex.Transaction,
  ): Promise<number> {
    const query = trx ? trx<OrderComplaint>('order_complaints') : this.qb;

    const result = await query
      .where('shop_id', shopId)
      .whereNotIn('status', RESOLVED_STATUSES)
      .count('* as count')
      .first<{ count: string }>();

    return parseInt(result?.count || '0', 10);
  }

  /**
   * Update shop complaint restriction status
   */
  async updateShopRestriction(
    shopId: string,
    isRestricted: boolean,
    trx?: Knex.Transaction,
  ): Promise<void> {
    const query = trx ? trx('shops') : this.knexInstance('shops');

    await query.where('id', shopId).update({
      is_complaint_restricted: isRestricted,
      complaint_restricted_at: isRestricted ? new Date() : null,
      updated_at: new Date(),
    });
  }

  /**
   * Get knex transaction
   */
  async getTransaction(): Promise<Knex.Transaction> {
    return this.knexInstance.transaction();
  }

  /**
   * Get complaint by ID
   */
  async getComplaintById(complaintId: string): Promise<OrderComplaint | null> {
    const result = await this.qb.where('id', complaintId).first();
    return result ?? null;
  }

  /**
   * Update complaint status
   */
  async updateComplaintStatus(
    complaintId: string,
    status: ComplaintStatus,
    trx?: Knex.Transaction,
  ): Promise<void> {
    const query = trx ? trx<OrderComplaint>('order_complaints') : this.qb;

    const updateData: Partial<OrderComplaint> = {
      status,
      updated_at: new Date(),
    };

    // Set dismissed_at if status is dismissed
    if (status === 'dismissed') {
      updateData.closed_at = new Date();
    }

    await query.where('id', complaintId).update(updateData);
  }

  /**
   * Update complaint fields (for user to update their complaint)
   */
  async updateComplaint(
    complaintId: string,
    data: {
      type: string;
      title: string;
      description: string;
      evidence_images?: string[];
      reason_detail?: string;
      requested_resolution?: string;
    },
    trx?: Knex.Transaction,
  ): Promise<OrderComplaint> {
    const query = trx ? trx<OrderComplaint>('order_complaints') : this.qb;

    const updateData: Record<string, unknown> = {
      type: data.type,
      title: data.title.trim(),
      description: data.description.trim(),
      updated_at: new Date(),
    };

    // Only update evidence_images if it's explicitly provided
    // - undefined: keep existing images (don't update)
    // - []: clear all images (intentional deletion)
    // - [urls...]: update with new images
    if (data.evidence_images !== undefined) {
      updateData.evidence_images = JSON.stringify(data.evidence_images);
    }

    if (data.reason_detail) {
      updateData.reason_detail = data.reason_detail.trim();
    } else {
      updateData.reason_detail = null;
    }

    if (data.requested_resolution) {
      updateData.requested_resolution = data.requested_resolution;
    }

    await query.where('id', complaintId).update(updateData);

    // Get updated complaint
    const selectQuery = trx
      ? trx<OrderComplaint>('order_complaints')
      : this.knexInstance<OrderComplaint>('order_complaints');
    const updated = await selectQuery.where('id', complaintId).first();
    if (!updated) {
      throw new Error('Failed to update complaint');
    }

    return updated;
  }

  /**
   * Get complaint by order ID with full details (order, shop, items, status logs)
   */
  async getComplaintByOrderId(
    orderId: string,
  ): Promise<ComplaintFullDetail | null> {
    // Get complaint
    const complaint = await this.qb.where('order_id', orderId).first();
    if (!complaint) return null;

    // Get order with shop info
    const order = await this.knexInstance
      .select([
        'orders.id',
        'orders.order_number',
        'orders.total_amount',
        'orders.status',
        'orders.created_at',
        'shops.id as shop_id',
        'shops.name as shop_name',
        'shops.avatar_url as shop_avatar_url',
      ])
      .from('orders')
      .leftJoin('shops', 'orders.shop_id', 'shops.id')
      .where('orders.id', orderId)
      .first<
        | {
            id: string;
            order_number: string;
            total_amount: string | number;
            status: string;
            created_at: Date;
            shop_id: string;
            shop_name: string;
            shop_avatar_url: string | null;
          }
        | undefined
      >();

    if (!order) return null;

    // Get order items with product info
    interface OrderItemRow {
      id: string;
      product_id: string;
      quantity: number;
      total_price: string | number;
      final_price: string | number;
      product_name: string | null;
      product_image: string | null;
    }
    const knex = this.knexInstance;
    const items = await knex
      .select<OrderItemRow[]>([
        'order_items.id',
        'order_items.product_id',
        'order_items.quantity',
        'order_items.total_price',
        'order_items.final_price',
        'product_versions.name as product_name',
        'pvi.file_path as product_image',
      ])
      .from('order_items')
      .leftJoin(
        'product_versions',
        'order_items.product_version_id',
        'product_versions.id',
      )
      .leftJoin('product_version_images as pvi', function () {
        this.on('product_versions.id', '=', 'pvi.product_version_id').andOn(
          'pvi.is_primary',
          '=',
          knex.raw('true'),
        );
      })
      .where('order_items.order_id', orderId);

    // Get status logs
    const statusLogs = await this.knexInstance<ComplaintStatusLog>(
      'complaint_status_logs',
    )
      .where('complaint_id', complaint.id)
      .orderBy('created_at', 'asc');

    return {
      complaint,
      order: {
        id: order.id,
        order_number: order.order_number,
        total_amount: Number(order.total_amount),
        status: order.status,
        created_at: order.created_at,
      },
      shop: {
        id: order.shop_id,
        name: order.shop_name,
        avatar_url: order.shop_avatar_url,
      },
      items: items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name || 'Unknown Product',
        product_image: item.product_image || null,
        quantity: item.quantity,
        total_price: Number(item.total_price),
        final_price: Number(item.final_price),
      })),
      status_logs: statusLogs,
    };
  }

  /**
   * Get complaint detail by complaint ID for shop owner
   * Includes buyer info instead of shop info
   */
  async getComplaintDetailForShop(
    complaintId: string,
    shopId: string,
  ): Promise<ComplaintFullDetailForShop | null> {
    // Get complaint
    const complaint = await this.qb.where('id', complaintId).first();
    if (!complaint) return null;

    // Verify shop owns this complaint
    if (complaint.shop_id !== shopId) {
      return null;
    }

    // Get order with buyer info
    const order = await this.knexInstance
      .select([
        'orders.id',
        'orders.order_number',
        'orders.total_amount',
        'orders.status',
        'orders.created_at',
        'orders.buyer_id',
        'users.username as buyer_username',
        'user_profiles.avatar_url as buyer_avatar_url',
      ])
      .from('orders')
      .leftJoin('users', 'orders.buyer_id', 'users.id')
      .leftJoin('user_profiles', 'users.id', 'user_profiles.user_id')
      .where('orders.id', complaint.order_id)
      .first<
        | {
            id: string;
            order_number: string;
            total_amount: string | number;
            status: string;
            created_at: Date;
            buyer_id: string;
            buyer_username: string | null;
            buyer_avatar_url: string | null;
          }
        | undefined
      >();

    if (!order) return null;

    // Get order items with product info
    interface OrderItemRow {
      id: string;
      product_id: string;
      quantity: number;
      total_price: string | number;
      final_price: string | number;
      product_name: string | null;
      product_image: string | null;
    }
    const knex = this.knexInstance;
    const items = await knex
      .select<OrderItemRow[]>([
        'order_items.id',
        'order_items.product_id',
        'order_items.quantity',
        'order_items.total_price',
        'order_items.final_price',
        'product_versions.name as product_name',
        'pvi.file_path as product_image',
      ])
      .from('order_items')
      .leftJoin(
        'product_versions',
        'order_items.product_version_id',
        'product_versions.id',
      )
      .leftJoin('product_version_images as pvi', function () {
        this.on('product_versions.id', '=', 'pvi.product_version_id').andOn(
          'pvi.is_primary',
          '=',
          knex.raw('true'),
        );
      })
      .where('order_items.order_id', complaint.order_id);

    // Get status logs
    const statusLogs = await this.knexInstance<ComplaintStatusLog>(
      'complaint_status_logs',
    )
      .where('complaint_id', complaint.id)
      .orderBy('created_at', 'asc');

    return {
      complaint,
      order: {
        id: order.id,
        order_number: order.order_number,
        total_amount: Number(order.total_amount),
        status: order.status,
        created_at: order.created_at,
      },
      buyer: {
        id: order.buyer_id,
        username: order.buyer_username || 'Unknown',
        avatar_url: order.buyer_avatar_url,
      },
      items: items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name || 'Unknown Product',
        product_image: item.product_image || null,
        quantity: item.quantity,
        total_price: Number(item.total_price),
        final_price: Number(item.final_price),
      })),
      status_logs: statusLogs,
    };
  }

  /**
   * Get order total amount by order ID
   */
  async getOrderTotalAmount(orderId: string): Promise<number | null> {
    const order = await this.knexInstance('orders')
      .select('total_amount')
      .where('id', orderId)
      .first<{ total_amount: string | number } | undefined>();

    if (!order) return null;
    return Number(order.total_amount);
  }

  /**
   * Get order with shop amount (total_amount - commission)
   * This is the amount that was added to shop's locked_balance
   */
  async getOrderWithShopAmount(
    orderId: string,
  ): Promise<{ total_amount: number; shop_amount: number } | null> {
    const order = await this.knexInstance('orders')
      .select('total_amount')
      .where('id', orderId)
      .first<{ total_amount: string | number } | undefined>();

    if (!order) return null;

    const totalAmount = Number(order.total_amount);

    // Calculate commission from order_items and category_commissions
    interface OrderItemWithCommission {
      final_price: string | number;
      category_commissions_id: string | null;
      commission_rate: string | number | null;
    }

    const orderItemsResult = await this.knexInstance('order_items')
      .select([
        'order_items.final_price',
        'order_items.category_commissions_id',
        'category_commissions.commission_rate',
      ])
      .leftJoin(
        'category_commissions',
        'order_items.category_commissions_id',
        'category_commissions.id',
      )
      .where('order_items.order_id', orderId);

    const orderItems = orderItemsResult as OrderItemWithCommission[];

    let totalCommission = 0;
    for (const item of orderItems) {
      const finalPrice = Number(item.final_price || 0);
      const commissionRate = Number(item.commission_rate || 0);
      const commission = finalPrice * (commissionRate / 100);
      totalCommission += commission;
    }

    const shopAmount = totalAmount - totalCommission;

    return {
      total_amount: totalAmount,
      shop_amount: Number(shopAmount.toFixed(2)),
    };
  }

  /**
   * Update payment_release_status of order
   */
  async updateOrderPaymentReleaseStatus(
    orderId: string,
    paymentReleaseStatus:
      | 'pending_release'
      | 'released'
      | 'disputed'
      | 'refunded',
    trx?: Knex.Transaction,
  ): Promise<void> {
    const query = trx ? trx('orders') : this.knexInstance('orders');

    await query.where('id', orderId).update({
      payment_release_status: paymentReleaseStatus,
      updated_at: new Date(),
    });
  }

  /**
   * Update complaint response from shop
   */
  async updateComplaintResponse(
    complaintId: string,
    shopId: string,
    data: {
      action: 'refund' | 'update_product';
      refund_amount: number;
      resolution_message?: string;
    },
    trx?: Knex.Transaction,
  ): Promise<OrderComplaint> {
    const query = trx ? trx<OrderComplaint>('order_complaints') : this.qb;

    // Verify shop owns this complaint
    const complaint = await query.where('id', complaintId).first();
    if (!complaint || complaint.shop_id !== shopId) {
      throw new Error(
        'Complaint not found or shop does not own this complaint',
      );
    }

    // Determine new status and resolution type
    // When shop responds, status should be 'shop_responded'
    const newStatus: ComplaintStatus = 'shop_responded';
    const updateData: Partial<OrderComplaint> = {
      status: newStatus,
      updated_at: new Date(),
    };

    if (data.action === 'refund') {
      updateData.resolution_type = 'refund';
      updateData.refund_amount = data.refund_amount;
      updateData.resolution =
        data.resolution_message || 'Đã hoàn tiền cho khách hàng';
    } else if (data.action === 'update_product') {
      updateData.resolution_type = 'replacement';
      updateData.resolution =
        data.resolution_message || 'Đã cập nhật sản phẩm / link download mới';
    }

    await query.where('id', complaintId).update(updateData);

    // Get updated complaint using a new query
    const selectQuery = trx
      ? trx<OrderComplaint>('order_complaints')
      : this.knexInstance<OrderComplaint>('order_complaints');
    const updated = await selectQuery.where('id', complaintId).first();
    if (!updated) {
      throw new Error('Failed to update complaint');
    }

    return updated;
  }

  /**
   * Get complaints by shop_id with filters, search, and pagination
   */
  async getComplaintsByShopId(
    shopId: string,
    options: {
      search?: string;
      statusFilter?:
        | 'all'
        | 'pending'
        | 'responded'
        | 'resolved'
        | 'closed'
        | 'dismissed'
        | 'investigating'
        | 'shop_responded'
        | 'admin_review'
        | 'rejected'
        | 'cancelled';
      orderBy?: string;
      orderDir?: 'asc' | 'desc';
      page?: number;
      limit?: number;
    },
  ): Promise<{
    records: Array<{
      id: string;
      created_at: Date;
      order_number: string;
      order_id: string;
      product: {
        id: string;
        name: string;
        image: string | null;
      };
      reason: string;
      status: ComplaintStatus;
    }>;
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      previousPage: number | null;
      nextPage: number | null;
    };
  }> {
    const {
      search,
      statusFilter = 'all',
      orderBy = 'order_complaints.created_at',
      orderDir = 'desc',
      page = 1,
      limit = 10,
    } = options;

    // Build base query
    const baseQuery = this.knexInstance
      .select([
        'order_complaints.id',
        'order_complaints.created_at',
        'order_complaints.order_id',
        'order_complaints.status',
        'order_complaints.title as reason',
        'orders.order_number',
        // Get first product from order items
        this.knexInstance.raw(
          `(
            SELECT product_versions.product_id
            FROM order_items
            LEFT JOIN product_versions ON order_items.product_version_id = product_versions.id
            WHERE order_items.order_id = orders.id
            LIMIT 1
          ) as product_id`,
        ),
        this.knexInstance.raw(
          `(
            SELECT product_versions.name
            FROM order_items
            LEFT JOIN product_versions ON order_items.product_version_id = product_versions.id
            WHERE order_items.order_id = orders.id
            LIMIT 1
          ) as product_name`,
        ),
        this.knexInstance.raw(
          `(
            SELECT pvi.file_path
            FROM order_items
            LEFT JOIN product_versions ON order_items.product_version_id = product_versions.id
            LEFT JOIN product_version_images as pvi ON product_versions.id = pvi.product_version_id AND pvi.is_primary = true
            WHERE order_items.order_id = orders.id
            LIMIT 1
          ) as product_image`,
        ),
      ])
      .from('order_complaints')
      .leftJoin('orders', 'order_complaints.order_id', 'orders.id')
      .where('order_complaints.shop_id', shopId);

    // Apply status filter
    if (statusFilter === 'all') {
      // No filter - show all statuses
    } else if (statusFilter === 'pending') {
      baseQuery.where('order_complaints.status', 'pending');
    } else if (statusFilter === 'shop_responded') {
      baseQuery.where('order_complaints.status', 'shop_responded');
    } else if (statusFilter === 'admin_review') {
      baseQuery.where('order_complaints.status', 'admin_review');
    } else if (statusFilter === 'resolved') {
      baseQuery.where('order_complaints.status', 'resolved');
    } else if (statusFilter === 'rejected') {
      baseQuery.where('order_complaints.status', 'rejected');
    } else if (statusFilter === 'cancelled') {
      baseQuery.where('order_complaints.status', 'cancelled');
    } else if (statusFilter === 'closed') {
      baseQuery.where('order_complaints.status', 'closed');
    } else if (statusFilter === 'responded') {
      // Legacy filter: show shop_responded, resolved, closed
      baseQuery.whereIn('order_complaints.status', [
        'shop_responded',
        'resolved',
        'closed',
      ]);
    } else if (statusFilter === 'dismissed') {
      baseQuery.where('order_complaints.status', 'dismissed');
    } else if (statusFilter === 'investigating') {
      baseQuery.where('order_complaints.status', 'investigating');
    }

    // Apply search by order_number
    if (search && search.trim()) {
      baseQuery.where('orders.order_number', 'ilike', `%${search.trim()}%`);
    }

    // Count total
    const countQuery = baseQuery.clone().clearSelect().clearOrder();
    const countResult = await countQuery
      .count('order_complaints.id as total')
      .first<{ total: string | number }>();
    const total = Number(countResult?.total || 0);

    // Apply ordering
    baseQuery.orderBy(orderBy, orderDir);

    // Apply pagination
    const offset = (page - 1) * limit;
    const records = (await baseQuery.offset(offset).limit(limit)) as Array<{
      id: string;
      created_at: Date;
      order_id: string;
      status: ComplaintStatus;
      reason: string;
      order_number: string;
      product_id?: string;
      product_name?: string;
      product_image?: string;
    }>;

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    return {
      records: records.map((record) => ({
        id: record.id,
        created_at: record.created_at,
        order_number: record.order_number,
        order_id: record.order_id,
        product: {
          id: (record as unknown as { product_id?: string }).product_id || '',
          name:
            (record as unknown as { product_name?: string }).product_name ||
            'Unknown Product',
          image:
            (record as unknown as { product_image?: string }).product_image ||
            null,
        },
        reason: record.reason,
        status: record.status,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasPreviousPage,
        hasNextPage,
        previousPage: hasPreviousPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
      },
    };
  }
}

// Types for complaint full detail
export interface ComplaintFullDetail {
  complaint: OrderComplaint;
  order: {
    id: string;
    order_number: string;
    total_amount: number;
    status: string;
    created_at: Date;
  };
  shop: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
  items: {
    id: string;
    product_id: string;
    product_name: string;
    product_image: string | null;
    quantity: number;
    total_price: number;
    final_price: number;
  }[];
  status_logs: ComplaintStatusLog[];
}

// Types for complaint full detail for shop view
export interface ComplaintFullDetailForShop {
  complaint: OrderComplaint;
  order: {
    id: string;
    order_number: string;
    total_amount: number;
    status: string;
    created_at: Date;
  };
  buyer: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
  items: {
    id: string;
    product_id: string;
    product_name: string;
    product_image: string | null;
    quantity: number;
    total_price: number;
    final_price: number;
  }[];
  status_logs: ComplaintStatusLog[];
}
