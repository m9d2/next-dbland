import sqlite3 from 'sqlite3';
import fs from 'fs';

export default class DBDriver {
  private static instance: DBDriver;
  private readonly db: sqlite3.Database;

  private constructor() {
    this.db = new sqlite3.Database('./db.sqlite', (err) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        // console.log('Database connection established.');
        this.initializeDB();
      }
    });
  }

  static getInstance(): DBDriver {
    if (!DBDriver.instance) {
      DBDriver.instance = new DBDriver();
    }
    return DBDriver.instance;
  }

  private initializeDB(): void {
    const sqlScriptPath = "init.sql"
    if (fs.existsSync(sqlScriptPath)) {
      const sqlScript = fs.readFileSync(sqlScriptPath, 'utf-8');
      this.db.exec(sqlScript, (err) => {
        if (err) {
          console.error('Error executing SQL script:', err);
        } else {
          // console.log('Database initialized successfully.');
        }
      });
    } else {
      console.log('SQL script not found.');
    }
  }

  async findAll(table: string): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all(`SELECT * FROM \`${table}\``, (err, rows) => {
          if (err) {
            console.error(`Error fetching all data from ${table}:`, err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    });
  }

  async findById(table: string, id: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      try {
        this.db.serialize(() => {
          this.db.get(`SELECT * FROM \`${table}\` WHERE id = ?`, id, (err, row) => {
            if (err) {
              console.error(`Error fetching data by ID from ${table}:`, err);
              reject(err);
            } else {
              resolve(row);
            }
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async insert(table: string, data: unknown): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const columns = Object.keys(data).join(',');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(',');

        this.db.serialize(() => {
          this.db.run(
            `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`,
            values,
            function(err) {
              if (err) {
                console.error(`Error inserting into ${table}:`, err);
                reject(err);
              } else {
                resolve();
              }
            },
          );
        });
      } catch (err) {
        console.error(`Error inserting into ${table}:`, err);
        reject(err);
      }
    });
  }

  async close(): Promise<void> {
    try {
      this.db.close();
    } catch (err) {
      console.error('Error closing database connection:', err);
      throw err;
    }
  }
}