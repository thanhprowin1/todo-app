import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';

@Injectable()
export class SqlServerService {
  private pool: sql.ConnectionPool;

  async connect() {
    if (!this.pool) {
      this.pool = await sql.connect({
        user: 'sa',
        password: '0919754566lun',
        server: 'DESKTOP-MHJ21J3\\SQLEXPRESS01', // Double backslash for escaping
        database: 'ToDoDB',
        options: {
          encrypt: false, // Nếu dùng SSL thì để true
          trustServerCertificate: true,
        },
      });
    }
    return this.pool;
  }

  async query(query: string, params: any[] = []) {
    const pool = await this.connect();
    const request = pool.request();
    params.forEach((param, index) => {
      request.input(`param${index}`, param);
    });
    const result = await request.query(query);
    return result.recordset;
  }
}
