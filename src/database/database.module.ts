import { Module } from '@nestjs/common';
import { SqlServerService } from './sqlserver.service';
import { SqliteService } from './sqlite.service';

@Module({
  providers: [SqlServerService, SqliteService],
  exports: [SqlServerService, SqliteService]
})
export class DatabaseModule {}