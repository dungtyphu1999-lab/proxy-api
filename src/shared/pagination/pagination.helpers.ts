import {
  PaginationMeta,
  CreatePaginationMetaOptions,
} from './pagination.interface';
import { PAGINATION_CONSTANTS } from './pagination.constants';

/**
 * Creates comprehensive pagination metadata
 */
export function createPaginationMeta(
  options: CreatePaginationMetaOptions,
): PaginationMeta {
  const { total, page, limit } = options;
  const totalPages = Math.ceil(total / limit);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  const previousPage = hasPreviousPage ? page - 1 : null;
  const nextPage = hasNextPage ? page + 1 : null;

  return {
    total,
    page,
    limit,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    previousPage,
    nextPage,
  };
}

/**
 * Calculates the offset for SQL queries based on page and limit
 */
export function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

/**
 * Validates pagination parameters and returns normalized values
 */
export function normalizePaginationOptions(options: {
  page?: number;
  limit?: number;
}): { page: number; limit: number } {
  const page = Math.max(1, options.page || PAGINATION_CONSTANTS.DEFAULT_PAGE);
  const limit = Math.min(
    PAGINATION_CONSTANTS.MAX_LIMIT,
    Math.max(
      PAGINATION_CONSTANTS.MIN_LIMIT,
      options.limit || PAGINATION_CONSTANTS.DEFAULT_LIMIT,
    ),
  );

  return { page, limit };
}

/**
 * Generates pagination links/URLs (useful for API responses)
 */
export function generatePaginationLinks(
  baseUrl: string,
  meta: PaginationMeta,
  queryParams?: Record<string, string | number>,
): {
  first: string;
  previous: string | null;
  next: string | null;
  last: string;
} {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', meta.limit.toString());

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, value.toString());
        }
      });
    }

    return `${baseUrl}?${params.toString()}`;
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
export function isValidOrderField(
  field: string,
  allowedFields: readonly string[],
): boolean {
  return allowedFields.includes(field);
}

/**
 * Sanitizes search term by trimming and limiting length
 */
export function sanitizeSearchTerm(search?: string): string | undefined {
  if (!search) return undefined;

  const trimmed = search.trim();
  if (trimmed.length === 0) return undefined;

  return trimmed.length > PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH
    ? trimmed.substring(0, PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH)
    : trimmed;
}

/**
 * Creates a page range for pagination UI components
 */
export function createPageRange(
  currentPage: number,
  totalPages: number,
  maxPages: number = 5,
): number[] {
  if (totalPages <= maxPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxPages / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxPages - 1);

  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
