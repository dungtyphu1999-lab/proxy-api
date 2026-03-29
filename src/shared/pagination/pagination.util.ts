import { Knex } from 'knex';
import { BadRequestException } from '@nestjs/common';
import {
  PaginationOptions,
  PaginatedResult,
  FilterValue,
} from './pagination.interface';
import {
  PAGINATION_CONSTANTS,
  PAGINATION_ERRORS,
  OrderDirection,
} from './pagination.constants';
import {
  createPaginationMeta,
  calculateOffset,
  sanitizeSearchTerm,
} from './pagination.helpers';

interface CountResult {
  total: string | number;
}

/**
 * Advanced pagination function with comprehensive features
 * @template T - Type of the data being paginated
 * @param qb - Knex query builder instance
 * @param options - Pagination configuration options
 * @param countDistinctField - Optional field for distinct counting
 * @returns Promise resolving to paginated results
 */
export async function paginateQuery<T = unknown>(
  qb: Knex.QueryBuilder,
  options: PaginationOptions = {},
  countDistinctField?: string,
): Promise<PaginatedResult<T>> {
  const {
    page = PAGINATION_CONSTANTS.DEFAULT_PAGE,
    limit = PAGINATION_CONSTANTS.DEFAULT_LIMIT,
    search,
    searchFields = [],
    orderBy = PAGINATION_CONSTANTS.DEFAULT_ORDER_BY,
    orderDir = PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR,
    filters = {},
  } = options;

  // Validate pagination parameters
  validatePaginationParams({ page, limit, search, orderDir });

  const offset = calculateOffset(page, limit);
  const sanitizedSearch = sanitizeSearchTerm(search);

  // Apply filters with type safety
  applyFilters(qb, filters);

  // Apply search functionality
  if (sanitizedSearch && searchFields.length > 0) {
    applySearch(qb, sanitizedSearch, searchFields);
  }

  // Apply ordering with validation
  applyOrdering(qb, orderBy, orderDir);

  // Execute count query
  const total = await executeCountQuery(qb, countDistinctField);

  // Execute data query with pagination
  const records = await executeDataQuery<T>(qb, offset, limit);

  // Create comprehensive pagination metadata
  const meta = createPaginationMeta({ total, page, limit });

  return { records, meta };
}

export async function paginateUnionQuery<T = unknown>(
  knex: Knex,
  qb: Knex.QueryBuilder,
  options: PaginationOptions = {},
): Promise<PaginatedResult<T>> {
  const {
    page = PAGINATION_CONSTANTS.DEFAULT_PAGE,
    limit = PAGINATION_CONSTANTS.DEFAULT_LIMIT,
    search,
    searchFields = [],
    orderBy = PAGINATION_CONSTANTS.DEFAULT_ORDER_BY,
    orderDir = PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR,
  } = options;

  const offset = calculateOffset(page, limit);
  const sanitizedSearch = sanitizeSearchTerm(search);

  const wrapped = qb.clone().as('u');

  // Count
  const countQb = knex.queryBuilder().from(wrapped).count('* as total');
  if (sanitizedSearch && searchFields.length > 0) {
    countQb.where(function () {
      for (const field of searchFields) {
        this.orWhere(field, 'ilike', `%${sanitizedSearch}%`);
      }
    });
  }
  const totalResult = (await countQb.first()) as CountResult | undefined;
  const total = Number(totalResult?.total || 0);

  // Data
  const dataQb = knex.queryBuilder().from(wrapped).select('*');
  if (sanitizedSearch && searchFields.length > 0) {
    dataQb.where(function () {
      for (const field of searchFields) {
        this.orWhere(field, 'ilike', `%${sanitizedSearch}%`);
      }
    });
  }
  dataQb.orderBy(orderBy, orderDir).offset(offset).limit(limit);

  const records = (await dataQb) as T[];
  const meta = createPaginationMeta({ total, page, limit });
  return { records, meta };
}

/**
 * Validates pagination parameters and throws appropriate errors
 */
function validatePaginationParams(params: {
  page: number;
  limit: number;
  search?: string;
  orderDir: OrderDirection;
}): void {
  const { page, limit, search, orderDir } = params;

  if (page < 1) {
    throw new BadRequestException(PAGINATION_ERRORS.INVALID_PAGE);
  }

  if (
    limit < PAGINATION_CONSTANTS.MIN_LIMIT ||
    limit > PAGINATION_CONSTANTS.MAX_LIMIT
  ) {
    throw new BadRequestException(PAGINATION_ERRORS.INVALID_LIMIT);
  }

  if (search && search.length > PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH) {
    throw new BadRequestException(PAGINATION_ERRORS.SEARCH_TOO_LONG);
  }

  if (orderDir !== 'asc' && orderDir !== 'desc') {
    throw new BadRequestException(PAGINATION_ERRORS.INVALID_ORDER_DIR);
  }
}

/**
 * Applies filters to the query builder
 */
function applyFilters(
  qb: Knex.QueryBuilder,
  filters: Record<string, unknown>,
): void {
  Object.entries(filters).forEach(([field, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        // Handle array values with IN clause
        qb.whereIn(field, value);
      } else if (typeof value === 'object' && value !== null) {
        // Handle complex filter objects
        const filterObj = value as Record<string, unknown>;
        Object.entries(filterObj).forEach(([operator, filterValue]) => {
          applyComplexFilter(qb, field, operator, filterValue as FilterValue);
        });
      } else {
        // Simple equality filter
        qb.where(field, value);
      }
    }
  });
}

/**
 * Applies complex filters with operators (gt, lt, like, etc.)
 */
function applyComplexFilter(
  qb: Knex.QueryBuilder,
  field: string,
  operator: string,
  value: FilterValue,
): void {
  switch (operator) {
    case 'gt':
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        value instanceof Date
      ) {
        qb.where(field, '>', value);
      }
      break;
    case 'gte':
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        value instanceof Date
      ) {
        qb.where(field, '>=', value);
      }
      break;
    case 'lt':
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        value instanceof Date
      ) {
        qb.where(field, '<', value);
      }
      break;
    case 'lte':
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        value instanceof Date
      ) {
        qb.where(field, '<=', value);
      }
      break;
    case 'like':
      qb.where(field, 'like', `%${String(value)}%`);
      break;
    case 'ilike':
      qb.whereILike(field, `%${String(value)}%`);
      break;
    case 'not':
      qb.whereNot(field, value);
      break;
    case 'in':
      if (Array.isArray(value)) {
        qb.whereIn(field, value);
      }
      break;
    case 'notIn':
      if (Array.isArray(value)) {
        qb.whereNotIn(field, value);
      }
      break;
    case 'isNull':
      if (value === true) {
        qb.whereNull(field);
      } else if (value === false) {
        qb.whereNotNull(field);
      }
      break;
    default:
      qb.where(field, value);
  }
}

/**
 * Applies search functionality across multiple fields
 */
function applySearch(
  qb: Knex.QueryBuilder,
  search: string,
  searchFields: string[],
): void {
  qb.andWhere(function (builder) {
    searchFields.forEach((field, index) => {
      if (index === 0) {
        builder.whereILike(field, `%${search}%`);
      } else {
        builder.orWhereILike(field, `%${search}%`);
      }
    });
  });
}

/**
 * Applies ordering to the query
 */
function applyOrdering(
  qb: Knex.QueryBuilder,
  orderBy: string,
  orderDir: OrderDirection,
): void {
  // Support for multiple order fields
  if (orderBy.includes(',')) {
    const orderFields = orderBy.split(',').map((field) => field.trim());
    orderFields.forEach((field) => {
      qb.orderBy(field, orderDir);
    });
  } else {
    qb.orderBy(orderBy, orderDir);
  }
}

/**
 * Executes count query and returns total number of records
 */
async function executeCountQuery(
  qb: Knex.QueryBuilder,
  countDistinctField?: string,
): Promise<number> {
  const countQuery = qb.clone().clearSelect().clearOrder();

  let countResult: CountResult | undefined;

  if (countDistinctField) {
    countResult = (await countQuery
      .countDistinct({ total: countDistinctField })
      .first()) as CountResult | undefined;
  } else {
    countResult = (await countQuery.count({ total: '*' }).first()) as
      | CountResult
      | undefined;
  }

  return Number(countResult?.total || 0);
}

/**
 * Executes data query with pagination and returns results
 */
async function executeDataQuery<T>(
  qb: Knex.QueryBuilder,
  offset: number,
  limit: number,
): Promise<T[]> {
  const result: unknown = await qb.clone().offset(offset).limit(limit);
  return result as T[];
}

/**
 * Simple pagination utility for basic use cases
 */
export async function simplePaginate<T = unknown>(
  qb: Knex.QueryBuilder,
  page: number = PAGINATION_CONSTANTS.DEFAULT_PAGE,
  limit: number = PAGINATION_CONSTANTS.DEFAULT_LIMIT,
): Promise<PaginatedResult<T>> {
  return paginateQuery<T>(qb, { page, limit });
}
