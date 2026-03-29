import { OrderDirection } from './pagination.constants';

/**
 * Options for configuring pagination behavior
 * @template TOrderBy - Union type of allowed order by fields
 */
export interface PaginationOptions<TOrderBy extends string = string> {
  /** Page number (1-based, defaults to 1) */
  page?: number;
  /** Number of items per page (1-100, defaults to 10) */
  limit?: number;
  /** Search term for text-based filtering */
  search?: string;
  /** Database fields to search in when using search term */
  searchFields?: string[];
  /** Field to order results by */
  orderBy?: TOrderBy;
  /** Order direction (asc or desc, defaults to desc) */
  orderDir?: OrderDirection;
  /** Additional key-value filters to apply */
  filters?: Record<string, unknown>;
}

/**
 * Pagination metadata returned with results
 */
export interface PaginationMeta {
  /** Total number of items across all pages */
  total: number;
  /** Current page number (1-based) */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Previous page number (null if on first page) */
  previousPage: number | null;
  /** Next page number (null if on last page) */
  nextPage: number | null;
}

/**
 * Result structure for paginated queries
 * @template T - Type of the data items being paginated
 */
export interface PaginatedResult<T> {
  /** Array of records for the current page */
  records: T[];
  /** Pagination metadata */
  meta: PaginationMeta;
}

/**
 * Options for creating pagination metadata
 */
export interface CreatePaginationMetaOptions {
  total: number;
  page: number;
  limit: number;
}

/**
 * Filter value types supported by pagination
 */
export type FilterValue = string | number | boolean | Date | null | undefined;

/**
 * Enhanced pagination options with type-safe filters
 * @template TOrderBy - Union type of allowed order by fields
 * @template TFilters - Type-safe filter object
 */
export interface TypedPaginationOptions<
  TOrderBy extends string = string,
  TFilters extends Record<string, FilterValue> = Record<string, FilterValue>,
> extends Omit<PaginationOptions<TOrderBy>, 'filters'> {
  /** Type-safe filters */
  filters?: Partial<TFilters>;
}
