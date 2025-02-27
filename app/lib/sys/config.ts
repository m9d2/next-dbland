import DBDriver from '@/lib/sys/db';

export interface Config {
  id: number;
  type: string;
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

export class ConfigService {
  
  
  constructor() {
    
  }

  async getAll(): Promise<Config[]> {
    try {
      const rows = await DBDriver.getInstance().findAll('config');
      return rows as Config[];
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err;
    }
  }
  
  async getById(id: number): Promise<Config | null> {
    try {
      const row = await DBDriver.getInstance().findById('config', id);
      return row as Config;
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err;
    }
  }
  
}