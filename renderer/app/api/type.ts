export interface Response<T> {
    code: number
    data: T
    message?: string
}

export interface DatabaseType {
    name: string
}

export interface Table {
    name: string
}

export interface Column {
    name: string
    type: string
    nullable: boolean
    defaultValue: string
    primaryKey: boolean
    autoIncrement: boolean
    comment: string
}