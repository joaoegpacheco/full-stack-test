import Database from 'better-sqlite3';
import path from 'path';

// Caminho para o arquivo do banco de dados
const dbPath = path.join(__dirname, '../database.sqlite');

// Inicializar a conexão com o banco de dados
const db = new Database(dbPath, { verbose: console.log });

// Criar a tabela de usuários, se não existir
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`).run();

export default db;
