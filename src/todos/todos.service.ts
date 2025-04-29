import { Injectable } from '@nestjs/common';
import { SqliteService } from '../database/sqlite.service';

@Injectable()
export class TodosService {
  constructor(private readonly db: SqliteService) {}

  async create(title: string) {
    const query = `INSERT INTO Todos (Title, Completed) VALUES (?, ?)`;
    const result = await this.db.query(query, [title, 0]);
    return result;
  }

  async findAll() {
    const query = `SELECT * FROM Todos`;
    return await this.db.query(query);
  }

  async toggleCompleted(id: number) {
    const query = `
      UPDATE Todos
      SET Completed = CASE WHEN Completed = 1 THEN 0 ELSE 1 END
      WHERE Id = ?
    `;
    await this.db.query(query, [id]);
    return await this.db.query('SELECT * FROM Todos WHERE Id = ?', [id]);
  }

  async delete(id: number) {
    const query = `DELETE FROM Todos WHERE Id = ?`;
    await this.db.query(query, [id]);
    return { deleted: true };
  }
}
