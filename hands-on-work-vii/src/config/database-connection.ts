import mysql, { type Pool, type RowDataPacket } from 'mysql2/promise';

interface DatabaseConnectionConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export class DatabaseConnection {
  private readonly pool: Pool;

  constructor({ host, port, user, password, database }: DatabaseConnectionConfig) {
    this.pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 5,
    });
  }

  async query<T extends RowDataPacket[]>(sql: string, params: any[] = []): Promise<T> {
    const [rows] = await this.pool.execute<T>(sql, params);
    return rows;
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
