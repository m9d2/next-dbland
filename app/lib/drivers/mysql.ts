import mysql, { Pool } from 'mysql2';
import { QueryParams } from '../database';
import BaseDriver, { DatabaseConfig } from './base';

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

  protected createPool(): Pool {
    return mysql.createPool(this.config);
  }
}
