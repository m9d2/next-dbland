import { Database, QueryParams } from "../database";
import { DatabaseType } from '@/api/type';

export interface DatabaseConfig {
    type: string;
    host: string;
    port: number;
    user: string;
    password: string;
    database?: string;
}

export default abstract class BaseDriver<T> implements Database {

    protected config: DatabaseConfig;
    protected pool: T;
    protected constructor(protected databaseConfig: DatabaseConfig) {
        this.config = databaseConfig;
        this.pool = this.createPool(this.config)
    }

    connect(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    query(params: QueryParams): Promise<any> {
        throw new Error("Method not implemented.");
    }
    disconnect(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    protected createPool(config: DatabaseConfig): T {
        throw new Error("Method not implemented.");
    }

    execute(params: QueryParams): Promise<any> {
        return Promise.resolve(undefined);
    }

    getDatabase(): Promise<DatabaseType[]> {
        return Promise.resolve(undefined);
    }

    getTables(database: string): Promise<any> {
        return Promise.resolve(undefined);
    }

}