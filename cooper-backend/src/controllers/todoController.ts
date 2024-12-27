import { Request, Response, NextFunction } from 'express';
import db from '../database/database';

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, completed } = req.body;

    // Verificar se o usuário já existe (neste caso, assumindo que o user id é fornecido)
    const existingTodo = db.prepare('SELECT * FROM todos WHERE text = ? AND userId = ?').get(text, req.user?.id);

    if (existingTodo) {
      return res.status(400).json({ error: 'Tarefa já existe.' });
    }

    // Inserir a tarefa no banco de dados
    const stmt = db.prepare('INSERT INTO todos (userId, text, completed) VALUES (?, ?, ?)');
    const result = await stmt.run(req.user?.id, text, completed);

    // O ID da linha inserida está em result.lastInsertRowid
    const createdTodo = { 
      id: result.lastInsertRowid,
      userId: req.user?.id, 
      text, 
      completed 
    };

    res.status(201).json(createdTodo);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = db.prepare('SELECT * FROM todos WHERE userId = ?').all(req.user?.id);

    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
