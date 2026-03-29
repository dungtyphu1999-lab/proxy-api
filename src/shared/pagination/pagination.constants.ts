/**
 * Pagination constants used throughout the application
 */
export const PAGINATION_CONSTANTS = {
  /** Default page number */
  DEFAULT_PAGE: 1,
  /** Default number of items per page */
  DEFAULT_LIMIT: 10,
  /** Minimum number of items per page */
  MIN_LIMIT: 1,
  /** Maximum number of items per page */
  MAX_LIMIT: 100,
  /** Default order direction */
  DEFAULT_ORDER_DIR: 'desc' as const,
  /** Default order by field */
  DEFAULT_ORDER_BY: 'created_at',
  /** Maximum search term length */
  MAX_SEARCH_LENGTH: 255,
} as const;

/**
 * Supported order directions
 */
export type OrderDirection = 'asc' | 'desc';

/**
 * Common database fields used for ordering
 */
export const COMMON_ORDER_FIELDS = [
  'id',
  'created_at',
  'updated_at',
  'name',
  'title',
  'status',
] as const;

/**
 * Pagination error messages
 */
export const PAGINATION_ERRORS = {
  INVALID_PAGE: 'Page must be greater than 0',
  INVALID_LIMIT: `Limit must be between ${PAGINATION_CONSTANTS.MIN_LIMIT} and ${PAGINATION_CONSTANTS.MAX_LIMIT}`,
  INVALID_ORDER_DIR: 'Order direction must be either "asc" or "desc"',
  SEARCH_TOO_LONG: `Search term cannot exceed ${PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH} characters`,
  INVALID_ORDER_FIELD: 'Invalid order field specified',
} as const;
