import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const openDB = async () => {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
  return db;
};

export interface User {
  id: number;
  email: string;
  password?: string;
}

// Função para encontrar um usuário pelo email se necessário
const findByEmail = async (email: string): Promise<User | null> => {
  const db = await openDB();
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  return user ? user : null;
};

// Função para criar um novo usuário se necessário
const createUser = async (email: string, password: string): Promise<User> => {
  const db = await openDB();
  const result = await db.run(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password]
  );
  const user = await db.get('SELECT * FROM users WHERE id = ?', [result.lastID]);
  return user as User;
};

// Função para atualizar as informações de um usuário se necessário
const updateUser = async (id: number, email: string, password: string): Promise<User | null> => {
  const db = await openDB();
  await db.run(
    'UPDATE users SET email = ?, password = ? WHERE id = ?',
    [email, password, id]
  );
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
  return user ? (user as User) : null;
};

// Função para excluir um usuário se necessário
const deleteUser = async (id: number): Promise<void> => {
  const db = await openDB();
  await db.run('DELETE FROM users WHERE id = ?', [id]);
};

export default {
  findByEmail,
  createUser,
  updateUser,
  deleteUser,
};
