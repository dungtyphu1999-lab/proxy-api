import { SuccessResponseDto } from '@/shared/dto/response.dto';
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DatabaseService } from '@/database/database.service';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

@ApiTags('Health')
@Controller()
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
    type: SuccessResponseDto<{ status: string }>,
  })
  check() {
    return { status: 'ok' };
  }

  @Get('debug-db')
  async debugDb() {
    const knex = this.db.getKnex();
    const tables = await knex
      .select('tablename')
      .from('pg_tables')
      .where('schemaname', 'public')
      .orderBy('tablename');
    const migrations = await knex('knex_migrations').select('*').catch(() => []);

    // Check migration files on disk
    const migrDir = join(__dirname, '..', '..', 'database', 'migrations');
    const migrDirExists = existsSync(migrDir);
    const migrFiles = migrDirExists ? readdirSync(migrDir).filter(f => f.endsWith('.js')).slice(0, 5) : [];

    return {
      tableCount: tables.length,
      tables: tables.map((t: any) => t.tablename),
      migrationCount: migrations.length,
      migrations: migrations.slice(0, 5),
      migrationDir: migrDir,
      migrationDirExists: migrDirExists,
      migrationFileSample: migrFiles,
      migrationFileCount: migrDirExists ? readdirSync(migrDir).filter(f => f.endsWith('.js')).length : 0,
    };
  }
}


