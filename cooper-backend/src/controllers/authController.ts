import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database/database';

interface User {
  id: number;
  email: string;
  password: string;
}

const JWT_SECRET = 'sua_chave_secreta';

// Cadastro de usuários
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }

  try {
    // Verificar se o usuário já existe
    const existingUser = db.prepare(`
      SELECT * FROM users WHERE email = ?
    `).get(email);

    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir o usuário no banco de dados
    db.prepare(`
      INSERT INTO users (email, password) VALUES (?, ?)
    `).run(email, hashedPassword);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    next(error); // Passa o erro para o próximo middleware
  }
};

// Login de usuários
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }

  try {
    // Adicionando o casting explícito
    const user = db.prepare(`
      SELECT * FROM users WHERE email = ?
    `).get(email) as User | undefined;

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login realizado com sucesso!', token });
  } catch (error) {
    console.error(error);
    next(error); // Passa o erro para o próximo middleware
  }
};
