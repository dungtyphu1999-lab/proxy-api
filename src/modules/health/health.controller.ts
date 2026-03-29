import { SuccessResponseDto } from '@/shared/dto/response.dto';
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DatabaseService } from '@/database/database.service';

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
    return {
      tableCount: tables.length,
      tables: tables.map((t: any) => t.tablename),
      migrationCount: migrations.length,
      migrations: migrations.slice(0, 5),
    };
  }
}

