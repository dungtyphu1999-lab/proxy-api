import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('KnexConnection')
    private readonly knex: Knex,
  ) {}

  // Expose underlying Knex connection for read-only queries in services.
  // Prefer repositories for complex access patterns; this is for lightweight lookups.
  getKnex(): Knex {
    return this.knex;
  }

  /**
   * Execute a function within a database transaction
   * @param callback Function to execute within the transaction
   * @returns Promise resolving to the callback result
   */
  async transaction<T>(
    callback: (trx: Knex.Transaction) => Promise<T>,
  ): Promise<T> {
    return this.knex.transaction(callback);
  }

  /**
   * Get a new transaction instance
   * @returns Promise resolving to a Knex transaction
   */
  async getTrx(): Promise<Knex.Transaction> {
    return this.knex.transaction();
  }

  /**
   * Check if the database connection is healthy
   */
  async isHealthy(): Promise<boolean> {
    try {
      await this.knex.raw('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Close the database connection
   */
  async destroy(): Promise<void> {
    await this.knex.destroy();
  }

  /**
   * Close pool on app shutdown.
   */
  async onModuleDestroy(): Promise<void> {
    await this.knex.destroy();
  }
}
