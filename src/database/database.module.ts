import { Module, Global } from '@nestjs/common';
import knex, { Knex } from 'knex';
import knexConfig from './knexfile';
import { DatabaseService } from './database.service';

@Global()
@Module({
  providers: [
    {
      provide: 'KnexConnection',
      useFactory: (): Knex => {
        return knex(knexConfig.development);
      },
    },
    DatabaseService,
  ],
  exports: ['KnexConnection', DatabaseService],
})
export class DatabaseModule {}
