import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { SqlServerService } from './database/sqlserver.service';

@Module({
  imports: [TodosModule],
  providers: [SqlServerService],
  exports: [SqlServerService],
})
export class AppModule {}
