import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

let dbInstance: SQLiteDatabase | null = null;

export const connectToDb = async () => {
  if (dbInstance) {
    return dbInstance;
  }
  dbInstance = openDatabase(
    {name: 'tasks.db', location: 'default'},
    () => {
      console.log('connected successfully!');
    },
    error => {
      console.error('Error opening database: ', error);
      throw Error('Couldnt open DB');
    },
  );
  return dbInstance;
};

export const createTable = async (db: SQLiteDatabase): Promise<boolean> => {
  const addTaskQuery =
    'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, SubTasks TEXT ,status  TEXT)';
  try {
    await db.executeSql(addTaskQuery);
    return true;
  } catch (error) {
    console.error('Error Creating TAble : ', error);
    throw error;
  }
};

export const getTable = async (db: SQLiteDatabase): Promise<any[]> => {
  try {
    const Table = await db.executeSql('SELECT * FROM tasks');
    const result = Table[0].rows.raw(); // Get raw data as array of objects
    return result;
  } catch (error) {
    console.error('Error fetching table: ', error);
    throw error;
  }
};

export const deleteTable = async (db: SQLiteDatabase): Promise<boolean> => {
  try {
    await db.executeSql('DROP TABLE IF EXISTS tasks');
    return true;
  } catch (error) {
    console.error('Error deleting Table :', error);
    return false;
  }
};

export const addTask = async (
  title: string,
  subTasks?: string,
): Promise<boolean> => {
  try {
    const db = await connectToDb();
    const addQuery =
      'INSERT INTO tasks (title, SubTasks, status) VALUES (?, ?, ?)';
    const result = await db.executeSql(addQuery, [
      title,
      subTasks ?? null,
      status,
    ]);
    return result[0].rowsAffected > 0;
  } catch (error) {
    console.error('Error while trying to add new task:', error);
    throw error;
  }
};
