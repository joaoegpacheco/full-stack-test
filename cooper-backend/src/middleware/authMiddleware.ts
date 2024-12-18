import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'chave_secreta'; // Chave secreta usada para assinar o token

// Middleware para verificar se o usuário está autenticado
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho "Authorization"

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
  }

  try {
    // Verifica a validade do token com a chave secreta
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    // Adiciona as informações do usuário no objeto req
    req.user = { id: decoded.id, email: decoded.email };

    next(); // Chama o próximo middleware ou a rota
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};

export default authMiddleware;
