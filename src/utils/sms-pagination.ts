/**
 * SMS Pagination Utilities
 * 
 * Helper utilities for paginating through SMS reports and logs
 * 
 * @author SMS Modernization Team
 * @version 1.0.0
 */

import { SmsReportsQuery, SmsLogsQuery } from '../types/sms';
import { SmsValidationError } from '../errors/sms-errors';

/**
 * Pagination options
 */
export interface PaginationOptions {
  /** Maximum number of results per page (max 1000) */
  limit?: number;
  /** Starting offset for pagination */
  offset?: number;
  /** Auto-paginate through all results */
  autoPage?: boolean;
  /** Maximum total results to fetch (prevents infinite loops) */
  maxResults?: number;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  /** Current page results */
  results: T[];
  /** Current page number (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of results */
  totalResults: number;
  /** Number of results per page */
  limit: number;
  /** Whether there are more pages */
  hasNextPage: boolean;
  /** Whether there are previous pages */
  hasPreviousPage: boolean;
}

/**
 * Pagination iterator for SMS reports
 */
export class SmsReportsPaginator {
  private smsInstance: any;
  private baseQuery: SmsReportsQuery;
  private options: PaginationOptions;
  private currentOffset: number = 0;
  private hasMore: boolean = true;

  constructor(smsInstance: any, query: SmsReportsQuery = {}, options: PaginationOptions = {}) {
    this.smsInstance = smsInstance;
    this.baseQuery = { ...query };
    this.options = {
      limit: 100,
      autoPage: false,
      maxResults: 10000,
      ...options
    };

    if (this.options.limit! > 1000) {
      throw new SmsValidationError('Pagination limit cannot exceed 1000');
    }

    this.currentOffset = this.options.offset || 0;
  }

  /**
   * Get next page of results
   */
  async next(): Promise<PaginatedResponse<any> | null> {
    if (!this.hasMore) {
      return null;
    }

    const query = {
      ...this.baseQuery,
      limit: this.options.limit,
      offset: this.currentOffset
    };

    try {
      const response = await this.smsInstance.v3.getReports(query);
      
      const results = response.results || [];
      const totalResults = response.totalCount || results.length;
      const limit = this.options.limit!;
      const currentPage = Math.floor(this.currentOffset / limit) + 1;
      const totalPages = Math.ceil(totalResults / limit);

      // Update pagination state
      this.currentOffset += limit;
      this.hasMore = results.length === limit && this.currentOffset < (this.options.maxResults || Infinity);

      return {
        results,
        currentPage,
        totalPages,
        totalResults,
        limit,
        hasNextPage: this.hasMore,
        hasPreviousPage: currentPage > 1
      };
    } catch (error) {
      this.hasMore = false;
      throw error;
    }
  }

  /**
   * Get all results by auto-paginating
   */
  async *getAllResults(): AsyncGenerator<any, void, unknown> {
    while (this.hasMore) {
      const page = await this.next();
      if (!page || page.results.length === 0) {
        break;
      }

      for (const result of page.results) {
        yield result;
      }
    }
  }

  /**
   * Collect all results into an array
   */
  async collectAll(): Promise<any[]> {
    const allResults: any[] = [];
    
    for await (const result of this.getAllResults()) {
      allResults.push(result);
      
      // Safety check to prevent memory issues
      if (allResults.length >= (this.options.maxResults || 10000)) {
        break;
      }
    }

    return allResults;
  }

  /**
   * Reset pagination to start
   */
  reset(): void {
    this.currentOffset = this.options.offset || 0;
    this.hasMore = true;
  }
}

/**
 * Pagination iterator for SMS logs
 */
export class SmsLogsPaginator {
  private smsInstance: any;
  private baseQuery: SmsLogsQuery;
  private options: PaginationOptions;
  private currentOffset: number = 0;
  private hasMore: boolean = true;

  constructor(smsInstance: any, query: SmsLogsQuery = {}, options: PaginationOptions = {}) {
    this.smsInstance = smsInstance;
    this.baseQuery = { ...query };
    this.options = {
      limit: 100,
      autoPage: false,
      maxResults: 10000,
      ...options
    };

    if (this.options.limit! > 1000) {
      throw new SmsValidationError('Pagination limit cannot exceed 1000');
    }

    this.currentOffset = this.options.offset || 0;
  }

  /**
   * Get next page of results
   */
  async next(): Promise<PaginatedResponse<any> | null> {
    if (!this.hasMore) {
      return null;
    }

    const query = {
      ...this.baseQuery,
      limit: this.options.limit,
      offset: this.currentOffset
    };

    try {
      const response = await this.smsInstance.v3.getLogs(query);
      
      const results = response.results || [];
      const totalResults = response.totalCount || results.length;
      const limit = this.options.limit!;
      const currentPage = Math.floor(this.currentOffset / limit) + 1;
      const totalPages = Math.ceil(totalResults / limit);

      // Update pagination state
      this.currentOffset += limit;
      this.hasMore = results.length === limit && this.currentOffset < (this.options.maxResults || Infinity);

      return {
        results,
        currentPage,
        totalPages,
        totalResults,
        limit,
        hasNextPage: this.hasMore,
        hasPreviousPage: currentPage > 1
      };
    } catch (error) {
      this.hasMore = false;
      throw error;
    }
  }

  /**
   * Get all results by auto-paginating
   */
  async *getAllResults(): AsyncGenerator<any, void, unknown> {
    while (this.hasMore) {
      const page = await this.next();
      if (!page || page.results.length === 0) {
        break;
      }

      for (const result of page.results) {
        yield result;
      }
    }
  }

  /**
   * Collect all results into an array
   */
  async collectAll(): Promise<any[]> {
    const allResults: any[] = [];
    
    for await (const result of this.getAllResults()) {
      allResults.push(result);
      
      // Safety check to prevent memory issues
      if (allResults.length >= (this.options.maxResults || 10000)) {
        break;
      }
    }

    return allResults;
  }

  /**
   * Reset pagination to start
   */
  reset(): void {
    this.currentOffset = this.options.offset || 0;
    this.hasMore = true;
  }
}

/**
 * Helper function to create reports paginator
 */
export function createReportsPaginator(
  smsInstance: any, 
  query: SmsReportsQuery = {}, 
  options: PaginationOptions = {}
): SmsReportsPaginator {
  return new SmsReportsPaginator(smsInstance, query, options);
}

/**
 * Helper function to create logs paginator
 */
export function createLogsPaginator(
  smsInstance: any, 
  query: SmsLogsQuery = {}, 
  options: PaginationOptions = {}
): SmsLogsPaginator {
  return new SmsLogsPaginator(smsInstance, query, options);
}

/**
 * Helper function to get all reports with auto-pagination
 */
export async function getAllReports(
  smsInstance: any, 
  query: SmsReportsQuery = {}, 
  maxResults: number = 10000
): Promise<any[]> {
  const paginator = createReportsPaginator(smsInstance, query, { maxResults });
  return await paginator.collectAll();
}

/**
 * Helper function to get all logs with auto-pagination
 */
export async function getAllLogs(
  smsInstance: any, 
  query: SmsLogsQuery = {}, 
  maxResults: number = 10000
): Promise<any[]> {
  const paginator = createLogsPaginator(smsInstance, query, { maxResults });
  return await paginator.collectAll();
}
