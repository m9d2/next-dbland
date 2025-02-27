import { Database, QueryParams } from "../database";

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

}