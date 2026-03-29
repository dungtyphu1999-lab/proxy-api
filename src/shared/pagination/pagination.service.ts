import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import {
  PaginationOptions,
  PaginatedResult,
  TypedPaginationOptions,
  FilterValue,
} from './pagination.interface';
import { paginateQuery, simplePaginate } from './pagination.util';
import { PAGINATION_CONSTANTS } from './pagination.constants';
import {
  createPaginationMeta,
  generatePaginationLinks,
} from './pagination.helpers';

/**
 * Comprehensive pagination service with advanced features
 */
@Injectable()
export class PaginationService {
  /**
   * Standard pagination with full feature support
   */
  async paginate<T = unknown>(
    qb: Knex.QueryBuilder,
    options: PaginationOptions,
    countDistinctField?: string,
  ): Promise<PaginatedResult<T>> {
    return paginateQuery<T>(qb, options, countDistinctField);
  }

  /**
   * Type-safe pagination with strongly typed filters and order fields
   */
  async paginateTyped<
    T = unknown,
    TOrderBy extends string = string,
    TFilters extends Record<string, FilterValue> = Record<string, FilterValue>,
  >(
    qb: Knex.QueryBuilder,
    options: TypedPaginationOptions<TOrderBy, TFilters>,
    countDistinctField?: string,
  ): Promise<PaginatedResult<T>> {
    return paginateQuery<T>(
      qb,
      options as PaginationOptions,
      countDistinctField,
    );
  }

  /**
   * Simple pagination with minimal configuration
   */
  async paginateSimple<T = unknown>(
    qb: Knex.QueryBuilder,
    page: number = PAGINATION_CONSTANTS.DEFAULT_PAGE,
    limit: number = PAGINATION_CONSTANTS.DEFAULT_LIMIT,
  ): Promise<PaginatedResult<T>> {
    return simplePaginate<T>(qb, page, limit);
  }

  /**
   * Get pagination metadata without executing the data query
   */
  async getPaginationMeta(
    qb: Knex.QueryBuilder,
    page: number,
    limit: number,
    countDistinctField?: string,
  ): Promise<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    previousPage: number | null;
    nextPage: number | null;
  }> {
    const countQuery = qb.clone().clearSelect().clearOrder();
    const countResult = countDistinctField
      ? ((await countQuery
          .countDistinct({ total: countDistinctField })
          .first()) as { total?: string | number } | undefined)
      : ((await countQuery.count({ total: '*' }).first()) as
          | { total?: string | number }
          | undefined);

    const total = Number(
      (countResult as { total?: string | number })?.total || 0,
    );
    return createPaginationMeta({ total, page, limit });
  }

  /**
   * Generate pagination links for API responses
   */
  generateLinks(
    baseUrl: string,
    meta: {
      page: number;
      limit: number;
      totalPages: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    },
    queryParams?: Record<string, string | number>,
  ): {
    first: string;
    previous: string | null;
    next: string | null;
    last: string;
  } {
    const enhancedMeta = {
      ...meta,
      previousPage: meta.hasPreviousPage ? meta.page - 1 : null,
      nextPage: meta.hasNextPage ? meta.page + 1 : null,
      total: 0, // Not needed for link generation
    };
    return generatePaginationLinks(baseUrl, enhancedMeta, queryParams);
  }
}
