import { Pool } from 'pg';
import { QueryParams } from '../database';
import BaseDriver, { DatabaseConfig } from './base';

export default class PostgreSQL extends BaseDriver<Pool> {
  private static instance: PostgreSQL | null = null;

  private constructor(config: DatabaseConfig) {
    super(config);
  }

  static getInstance(config?: DatabaseConfig): PostgreSQL {
    if (!PostgreSQL.instance && config) {
      PostgreSQL.instance = new PostgreSQL(config);
    }
    return PostgreSQL.instance;
  }

  async connect(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.pool.connect((err) => {
        if (err) return reject(err);
        resolve('Connected success');
      });
    });
  }

  async query(params: QueryParams) {
    return new Promise((resolve, reject) => {
      this.pool.query(params.sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  async disconnect(): Promise<string> {
    return new Promise((resolve) => {
      this.pool.end(() => {
        PostgreSQL.instance = null;
        resolve('Connection pool closed.');
      });
    });
  }

  protected createPool(): Pool {
    return new Pool(this.config);;
  }
}
