// Chat Repository Constants
export const CHAT_CONSTANTS = {
  // Default conversation values
  DEFAULT_CONVERSATION_STATUS: 'active',
  DEFAULT_UNREAD_COUNT: 0,
  DEFAULT_IS_PINNED: false,
  DEFAULT_IS_MUTED: false,
  DEFAULT_NOTIFICATIONS_ENABLED: true,

  // Default message values
  DEFAULT_IS_READ: false,
  DEFAULT_IS_DELETED: false,

  // Default user display
  UNKNOWN_USER_NAME: 'Unknown User',

  // Default pagination
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_MESSAGE_PAGE_SIZE: 20,
  DEFAULT_SEARCH_LIMIT: 50,

  // Default relevance score
  DEFAULT_RELEVANCE_SCORE: '0',
} as const;
