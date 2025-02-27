export interface QueryParams {
  sql: string;
}

export interface Database {
  connect(): Promise<string>;

  query(params: QueryParams): Promise<any>;

  disconnect(): Promise<string>;
}
