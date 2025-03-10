import mysql, { Pool } from 'mysql2';
import { Database, QueryParams } from '../database';
import BaseDriver, { DatabaseConfig } from './base';
import { DatabaseType, TableType } from '@/api/type';

export default class MySQL extends BaseDriver<Pool> {

  private static instance: MySQL | null = null;
  private constructor(config: DatabaseConfig) {
    super(config);
  }

  static getInstance(config?: DatabaseConfig): MySQL {
    if (!MySQL.instance && config) {
      MySQL.instance = new MySQL(config);
    }
    return MySQL.instance;
  }

  async connect(): Promise<string> {
    console.log('Connecting to MySQL...', this.config, this.pool);
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err) => {
        if (err) return reject(err);
        resolve('Connected success');
      });
    });
  }

  async query(params: QueryParams) {
    return new Promise((resolve, reject) => {
      this.pool.query(params.sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  async disconnect(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.pool.end((err) => {
        if (err) return reject(err);
        MySQL.instance = null;
        resolve('Connection pool closed.');
      });
    });
  }
  
  getDatabase(): Promise<DatabaseType[]> {
    return new Promise((resolve, reject) => {
      this.pool.query('SHOW DATABASES', (err, results: mysql.RowDataPacket[]) => {
        if (err) return reject(err);
        
        const databases: DatabaseType[] = results.map((db) => {
          return {
            name: db.Database,
          };
        });
        resolve(databases);
      });
    });
  }
  
  getTables(database: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.query(`SELECT * FROM information_schema.tables WHERE table_schema = '${database}'`, (err, results: mysql.RowDataPacket[]) => {
        if (err) return reject(err);

        const tables: TableType[] = results.map((db) => {
          return {
            name: db.TABLE_NAME,
          };
        });
        resolve(tables);
      });
    });
  }

  protected createPool(): Pool {
    return mysql.createPool(this.config);
  }
}
