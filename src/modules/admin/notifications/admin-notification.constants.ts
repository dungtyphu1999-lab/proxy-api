// Admin Notification Constants
export const ADMIN_NOTIFICATION_CONSTANTS = {
  // Notification types
  NOTIFICATION_TYPES: {
    ORDER: 'order',
    WALLET: 'wallet',
    SYSTEM: 'system',
    SUPPORT: 'support',
    PRODUCT: 'product',
    COMPLAINT: 'complaint',
    CHAT: 'chat',
    PAYMENT: 'payment',
    BOOST: 'boost',
    SHOP: 'shop',
    BLOG: 'blog',
  } as const,

  // Default values
  DEFAULT_PAGE_SIZE: 20,
  DEFAULT_SEARCH_LIMIT: 50,
  DEFAULT_IS_READ: false,
} as const;

export type AdminNotificationType =
  (typeof ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES)[keyof typeof ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES];
