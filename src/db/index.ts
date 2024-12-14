import initSqlJs from 'sql.js';
import { schema } from './schema';

let db: any = null;

export const initDatabase = async () => {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });

  db = new SQL.Database();
  
  // Split schema into individual statements and execute them
  const statements = schema.split(';').filter(stmt => stmt.trim());
  
  for (const statement of statements) {
    try {
      db.run(statement);
    } catch (error) {
      console.error('Error executing statement:', statement);
      throw error;
    }
  }

  return db;
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

export { db };