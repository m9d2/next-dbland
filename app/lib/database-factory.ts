import { Database } from '@/lib/database';
import { DatabaseConfig } from './drivers/base';
import MySQL from './drivers/mysql';

export default class DatabaseFactory {
  private constructor() {
    // Private constructor to prevent instantiation from outside the class
  }

  public static getDatabase(cid: number): Database {
    const config = this.getConfig(cid);
    if (config.type === 'mysql') {
      return MySQL.getInstance(config);
    }
  }

  private static getConfig(cid: number): DatabaseConfig {
    console.log(cid);
    return {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '123456',
    };
  }
}
