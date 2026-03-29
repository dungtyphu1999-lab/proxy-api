"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGINATION_ERRORS = exports.COMMON_ORDER_FIELDS = exports.PAGINATION_CONSTANTS = void 0;
/**
 * Pagination constants used throughout the application
 */
exports.PAGINATION_CONSTANTS = {
    /** Default page number */
    DEFAULT_PAGE: 1,
    /** Default number of items per page */
    DEFAULT_LIMIT: 10,
    /** Minimum number of items per page */
    MIN_LIMIT: 1,
    /** Maximum number of items per page */
    MAX_LIMIT: 100,
    /** Default order direction */
    DEFAULT_ORDER_DIR: 'desc',
    /** Default order by field */
    DEFAULT_ORDER_BY: 'created_at',
    /** Maximum search term length */
    MAX_SEARCH_LENGTH: 255,
};
/**
 * Common database fields used for ordering
 */
exports.COMMON_ORDER_FIELDS = [
    'id',
    'created_at',
    'updated_at',
    'name',
    'title',
    'status',
];
/**
 * Pagination error messages
 */
exports.PAGINATION_ERRORS = {
    INVALID_PAGE: 'Page must be greater than 0',
    INVALID_LIMIT: "Limit must be between ".concat(exports.PAGINATION_CONSTANTS.MIN_LIMIT, " and ").concat(exports.PAGINATION_CONSTANTS.MAX_LIMIT),
    INVALID_ORDER_DIR: 'Order direction must be either "asc" or "desc"',
    SEARCH_TOO_LONG: "Search term cannot exceed ".concat(exports.PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH, " characters"),
    INVALID_ORDER_FIELD: 'Invalid order field specified',
};
