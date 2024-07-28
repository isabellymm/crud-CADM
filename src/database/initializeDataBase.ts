import { SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase){
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS produtos (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          nome TEXT NOT NULL,
          categoria TEXT NOT NULL, 
          descricao TEXT NOT NULL,
          quantidade INTEGER,
          preco INTEGER
        );
      `);
}
