import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getConfigs = async () => {
  try {
    const response = await apiClient.get('/config');
    return response.data;
  } catch (error) {
    console.error('Error fetching configs:', error);
    throw error;
  }
};

const getDatabase = async (cid: number) => {
  try {
    const response = await apiClient.post('/database', { cid });
    return response.data;
  } catch (error) {
    console.error('Error fetching database:', error);
    throw error;
  }
};

const getTables = async (cid: number, db: string) => {
  try {
    const response = await apiClient.post('/table', { cid, database: db });
    return response.data;
  } catch (error) {
    console.error('Error fetching tables:', error);
    throw error;
  }
};

const query = async (cid: number, db: string, sql: string) => {
  try {
    const response = await apiClient.post('/query', { cid, database: db, sql });
    return response.data;
  } catch (error) {
    console.error('Error fetching tables:', error);
    throw error;
  }
}

export {
  getConfigs,
  getDatabase,
  getTables,
  query
}