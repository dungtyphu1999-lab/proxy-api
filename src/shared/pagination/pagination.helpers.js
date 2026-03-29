"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginationMeta = createPaginationMeta;
exports.calculateOffset = calculateOffset;
exports.normalizePaginationOptions = normalizePaginationOptions;
exports.generatePaginationLinks = generatePaginationLinks;
exports.isValidOrderField = isValidOrderField;
exports.sanitizeSearchTerm = sanitizeSearchTerm;
exports.createPageRange = createPageRange;
var pagination_constants_1 = require("./pagination.constants");
/**
 * Creates comprehensive pagination metadata
 */
function createPaginationMeta(options) {
    var total = options.total, page = options.page, limit = options.limit;
    var totalPages = Math.ceil(total / limit);
    var hasPreviousPage = page > 1;
    var hasNextPage = page < totalPages;
    var previousPage = hasPreviousPage ? page - 1 : null;
    var nextPage = hasNextPage ? page + 1 : null;
    return {
        total: total,
        page: page,
        limit: limit,
        totalPages: totalPages,
        hasPreviousPage: hasPreviousPage,
        hasNextPage: hasNextPage,
        previousPage: previousPage,
        nextPage: nextPage,
    };
}
/**
 * Calculates the offset for SQL queries based on page and limit
 */
function calculateOffset(page, limit) {
    return (page - 1) * limit;
}
/**
 * Validates pagination parameters and returns normalized values
 */
function normalizePaginationOptions(options) {
    var page = Math.max(1, options.page || pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_PAGE);
    var limit = Math.min(pagination_constants_1.PAGINATION_CONSTANTS.MAX_LIMIT, Math.max(pagination_constants_1.PAGINATION_CONSTANTS.MIN_LIMIT, options.limit || pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_LIMIT));
    return { page: page, limit: limit };
}
/**
 * Generates pagination links/URLs (useful for API responses)
 */
function generatePaginationLinks(baseUrl, meta, queryParams) {
    var buildUrl = function (page) {
        var params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('limit', meta.limit.toString());
        if (queryParams) {
            Object.entries(queryParams).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (value !== undefined && value !== null) {
                    params.set(key, value.toString());
                }
            });
        }
        return "".concat(baseUrl, "?").concat(params.toString());
    };
    return {
        first: buildUrl(1),
        previous: meta.previousPage ? buildUrl(meta.previousPage) : null,
        next: meta.nextPage ? buildUrl(meta.nextPage) : null,
        last: buildUrl(meta.totalPages),
    };
}
/**
 * Checks if the provided order field is allowed
 */
function isValidOrderField(field, allowedFields) {
    return allowedFields.includes(field);
}
/**
 * Sanitizes search term by trimming and limiting length
 */
function sanitizeSearchTerm(search) {
    if (!search)
        return undefined;
    var trimmed = search.trim();
    if (trimmed.length === 0)
        return undefined;
    return trimmed.length > pagination_constants_1.PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH
        ? trimmed.substring(0, pagination_constants_1.PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH)
        : trimmed;
}
/**
 * Creates a page range for pagination UI components
 */
function createPageRange(currentPage, totalPages, maxPages) {
    if (maxPages === void 0) { maxPages = 5; }
    if (totalPages <= maxPages) {
        return Array.from({ length: totalPages }, function (_, i) { return i + 1; });
    }
    var half = Math.floor(maxPages / 2);
    var start = Math.max(1, currentPage - half);
    var end = Math.min(totalPages, start + maxPages - 1);
    if (end - start + 1 < maxPages) {
        start = Math.max(1, end - maxPages + 1);
    }
    return Array.from({ length: end - start + 1 }, function (_, i) { return start + i; });
}
