/**
 * Notification templates for consistent messaging across the application
 * This ensures title and message are synchronized between database records and emitted events
 */

import { formatCurrency } from '../helpers/currency';

/**
 * Link URL templates for admin notifications
 */
export const LINK_URL_TEMPLATES = {
  BLOG_POSTS: '/management/moderation?tab=blog_posts',
  SHOPS: '/management/moderation?tab=shops',
  PRODUCTS: '/management/moderation?tab=products',
  WITHDRAWAL_REQUESTS: '/management/moderation?tab=withdrawal_requests',
  SUPPORT_EMAIL: '/supports/email',
} as const;

export interface NotificationTemplate {
  title: string;
  message: string;
  link_url?: string;
}

export interface BlogNotificationData {
  blogTitle: string;
  status: string;
  authorId: string;
  approvalNotes?: string;
}

export interface ShopRequestNotificationData {
  storeName: string;
  status: string;
  note?: string;
}

export interface WalletTransactionNotificationData {
  amount: number;
  status: string;
  reason?: string;
  bankName?: string;
  bankNumber?: string;
}

export interface ProductNotificationData {
  productName: string;
  action: string;
  reason?: string;
}

/**
 * Blog notification templates
 */
export const BLOG_NOTIFICATION_TEMPLATES = {
  STATUS_CHANGED: (data: BlogNotificationData): NotificationTemplate => {
    const isApproved = data.status === 'duyệt và xuất bản';
    const isRejected = data.status === 'từ chối';

    if (isApproved) {
      return {
        title: 'Bài viết của bạn đã được duyệt',
        message: `Bài viết ${data.blogTitle} đã được duyệt và hiển thị trên hệ thống.`,
      };
    } else if (isRejected) {
      return {
        title: 'Bài viết của bạn chưa được duyệt',
        message: `Rất tiếc, bài viết ${data.blogTitle} chưa được duyệt. Lý do: ${data.approvalNotes || 'Không có lý do cụ thể'}`,
      };
    } else {
      return {
        title: 'Trạng thái bài viết đã thay đổi',
        message: `Bài viết ${data.blogTitle} đã được ${data.status}`,
      };
    }
  },
} as const;

/**
 * Shop request notification templates
 */
export const SHOP_REQUEST_NOTIFICATION_TEMPLATES = {
  STATUS_CHANGED: (data: ShopRequestNotificationData): NotificationTemplate => {
    const isApproved = data.status === 'duyệt';
    const isRejected = data.status === 'từ chối';

    if (isApproved) {
      return {
        title: 'Cửa hàng của bạn đã được duyệt',
        message: `Chúc mừng! Cửa hàng ${data.storeName} đã được duyệt và chính thức hoạt động`,
      };
    } else if (isRejected) {
      return {
        title: 'Cửa hàng của bạn chưa được duyệt',
        message: `Rất tiếc, cửa hàng ${data.storeName} của bạn chưa được duyệt. Lý do: ${data?.note || ''}`,
      };
    } else {
      return {
        title: 'Trạng thái yêu cầu shop đã thay đổi',
        message: `Yêu cầu tạo shop của bạn đã được ${data.status}`,
      };
    }
  },
} as const;

/**
 * Wallet transaction notification templates
 */
export const WALLET_NOTIFICATION_TEMPLATES = {
  STATUS_CHANGED: (
    data: WalletTransactionNotificationData,
  ): NotificationTemplate => {
    const isApproved = data.status === 'success';
    const isRejected = data.status === 'failed';

    if (isApproved) {
      return {
        title: 'Yêu cầu rút tiền của bạn đã được duyệt',
        message: `Bạn đã rút thành công ${formatCurrency(String(data.amount))} về tài khoản ${data.bankName} - ${data.bankNumber}.`,
        link_url: `/wallet/history`,
      };
    } else if (isRejected) {
      return {
        title: 'Yêu cầu rút tiền của bạn chưa được duyệt',
        message: `Yêu cầu rút tiền ${formatCurrency(String(data.amount))} đã bị từ chối. Lý do: ${data.reason || ''}`,
        link_url: `/wallet/history`,
      };
    } else {
      return {
        title: 'Trạng thái yêu cầu rút tiền đã thay đổi',
        message: `Yêu cầu rút tiền ${formatCurrency(String(data.amount))} của bạn đã được ${data.status}`,
        link_url: `/wallet/history`,
      };
    }
  },
} as const;

/**
 * Product notification templates
 */
export const PRODUCT_NOTIFICATION_TEMPLATES = {
  STATUS_CHANGED: (data: ProductNotificationData): NotificationTemplate => {
    const isApproved = data.action === 'approved';
    const isRejected = data.action === 'rejected';

    if (isApproved) {
      return {
        title: 'Sản phẩm của bạn đã được duyệt',
        message: `Sản phẩm ${data.productName} đã được duyệt và sẵn sàng để bán.`,
        link_url: '/my-shop/products/live',
      };
    } else if (isRejected) {
      return {
        title: 'Sản phẩm của bạn chưa được duyệt',
        message: `Sản phẩm ${data.productName} chưa được duyệt. Lý do: ${data.reason || 'Không có lý do cụ thể'}`,
        link_url: '/my-shop/products/rejected',
      };
    } else {
      return {
        title: 'Trạng thái sản phẩm đã thay đổi',
        message: `Sản phẩm ${data.productName} đã được ${data.action}`,
        link_url: '/my-shop/products/live',
      };
    }
  },
} as const;

/**
 * Blog user notification templates (for blog authors)
 */
export const BLOG_USER_NOTIFICATION_TEMPLATES = {
  BLOG_LIKED: (blogTitle: string, userName: string): NotificationTemplate => ({
    title: 'Có một yêu thích vào bài viết của bạn',
    message: `Bài viết ${blogTitle} vừa nhận được một yêu thích từ ${userName}`,
    link_url: undefined,
  }),
  BLOG_COMMENTED: (
    blogTitle: string,
    userName: string,
  ): NotificationTemplate => ({
    title: 'Có một bình luận vào bài viết của bạn',
    message: `Bài viết ${blogTitle} vừa nhận được một bình luận từ ${userName}`,
    link_url: undefined,
  }),
  BLOG_COMMENT_REPLIED: (
    blogTitle: string,
    userName: string,
  ): NotificationTemplate => ({
    title: 'Có một phản hồi cho bình luận của bạn',
    message: `Bài viết ${blogTitle} vừa nhận được một phản hồi từ ${userName}`,
    link_url: undefined,
  }),
} as const;

/**
 * Admin notification templates (for admin users)
 */
export const ADMIN_NOTIFICATION_TEMPLATES = {
  BLOG_CREATED: (
    blogTitle: string,
    userName: string,
  ): NotificationTemplate => ({
    title: 'Có một yêu cầu tạo bài viết',
    message: `Người dùng ${userName} đã gửi yêu cầu đăng bài viết: ${blogTitle}.`,
    link_url: LINK_URL_TEMPLATES.BLOG_POSTS,
  }),
  BLOG_UPDATED: (
    blogTitle: string,
    userName: string,
  ): NotificationTemplate => ({
    title: 'Có một yêu cầu cập nhật bài viết',
    message: `Người dùng ${userName} đã gửi yêu cầu cập nhật lại bài viết: ${blogTitle}.`,
    link_url: LINK_URL_TEMPLATES.BLOG_POSTS,
  }),
  SHOP_REQUEST_CREATED: (userName: string): NotificationTemplate => ({
    title: 'Có một yêu cầu tạo cửa hàng mới',
    message: `Người dùng ${userName} đã gửi yêu cầu tạo cửa hàng mới.`,
    link_url: LINK_URL_TEMPLATES.SHOPS,
  }),
  WITHDRAW_REQUEST_CREATED: (
    userName: string,
    amount: number,
    bankName: string,
    bankNumber: string,
  ): NotificationTemplate => ({
    title: 'Có một yêu cầu rút tiền mới',
    message: `Người dùng ${userName} đã gửi yêu cầu rút tiền ${amount.toLocaleString('vi-VN')} VNĐ tài khoản ${bankName} - ${bankNumber}.`,
    link_url: LINK_URL_TEMPLATES.WITHDRAWAL_REQUESTS,
  }),
  PRODUCT_CREATED: (
    userName: string,
    productName: string,
  ): NotificationTemplate => ({
    title: 'Có một yêu cầu tạo sản phẩm',
    message: `Người dùng ${userName} đã gửi yêu cầu tạo sản phẩm: ${productName}.`,
    link_url: LINK_URL_TEMPLATES.PRODUCTS,
  }),
  PRODUCT_UPDATED: (
    userName: string,
    productName: string,
  ): NotificationTemplate => ({
    title: 'Có một yêu cầu cập nhật sản phẩm',
    message: `Người dùng ${userName} đã gửi yêu cầu cập nhật lại sản phẩm: ${productName}.`,
    link_url: LINK_URL_TEMPLATES.PRODUCTS,
  }),
  SUPPORT_CONTACT_CREATED: (userName: string): NotificationTemplate => ({
    title: 'Có một yêu cầu hỗ trợ mới',
    message: `Người dùng ${userName} đã gửi một yêu cầu hỗ trợ. Vui lòng kiểm tra và phản hồi.`,
    link_url: LINK_URL_TEMPLATES.SUPPORT_EMAIL,
  }),
  PRODUCT_REVIEW_CREATED: (
    itemName: string,
    rating: number,
    userName: string,
    productSlug: string,
    categorySlug: string,
  ): NotificationTemplate => ({
    title: 'Có một đánh giá mới cho sản phẩm của bạn',
    message: `Sản phẩm ${itemName} vừa nhận được đánh giá ${rating}★ từ ${userName}.`,
    link_url: `/product/${categorySlug}/${productSlug}`,
  }),
} as const;

/**
 * Order complaint notification templates
 */
export const ORDER_COMPLAINT_NOTIFICATION_TEMPLATES = {
  COMPLAINT_CREATED_FOR_SHOP: (orderNumber: string): NotificationTemplate => ({
    title: 'Bạn có khiếu nại mới',
    message: `Đơn hàng #${orderNumber} có khiếu nại mới từ khách hàng. Vui lòng kiểm tra và phản hồi.`,
    link_url: undefined, // Will be set dynamically
  }),
  SHOP_RESPONDED_TO_USER: (orderNumber: string): NotificationTemplate => ({
    title: 'Cửa hàng đã phản hồi khiếu nại của bạn',
    message: `Cửa hàng đã phản hồi khiếu nại cho đơn hàng #${orderNumber}. Vui lòng kiểm tra phản hồi.`,
    link_url: undefined, // Will be set dynamically
  }),
} as const;
