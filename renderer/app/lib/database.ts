import { DatabaseType } from '@/api/type';

export interface QueryParams {
  sql: string;
}

export interface Database {
  connect(): Promise<string>;
  
  execute(params: QueryParams): Promise<any>;
  
  getDatabase(): Promise<DatabaseType[]>;
  
  getTables(database: string): Promise<any>;

  query(params: QueryParams): Promise<any>;

  disconnect(): Promise<string>;
}
