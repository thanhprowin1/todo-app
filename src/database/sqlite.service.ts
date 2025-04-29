import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

@Injectable()
export class SqliteService implements OnModuleInit {
  private db: Database;

  async onModuleInit() {
    // Initialize the database when the module is initialized
    await this.connect();
    await this.createTables();
  }

  async connect() {
    if (!this.db) {
      this.db = await open({
        filename: './todos.db',
        driver: sqlite3.Database,
      });
    }
    return this.db;
  }

  async createTables() {
    const db = await this.connect();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Todos (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Title TEXT NOT NULL,
        Completed INTEGER DEFAULT 0
      )
    `);
  }

  async query(query: string, params: any[] = []) {
    const db = await this.connect();
    
    if (query.trim().toUpperCase().startsWith('SELECT')) {
      return await db.all(query, ...params);
    } else if (query.trim().toUpperCase().startsWith('INSERT')) {
      const result = await db.run(query, ...params);
      if (result.lastID) {
        return await db.get('SELECT * FROM Todos WHERE Id = ?', result.lastID);
      }
      return result;
    } else {
      return await db.run(query, ...params);
    }
  }
}
