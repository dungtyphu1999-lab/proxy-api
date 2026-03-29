"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_CONSTANTS = void 0;
// Notification Repository Constants
exports.NOTIFICATION_CONSTANTS = {
    // Default notification values
    DEFAULT_IS_READ: false,
    DEFAULT_IS_DELETED: false,
    DEFAULT_IS_GLOBAL: false,
    // Default pagination
    DEFAULT_PAGE_SIZE: 20,
    DEFAULT_SEARCH_LIMIT: 50,
    // Default relevance score
    DEFAULT_RELEVANCE_SCORE: '0',
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
    },
};
