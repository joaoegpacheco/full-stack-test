import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);

// Middleware de erro
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err); // Log do erro para debugging
  res.status(500).json({ error: 'Algo deu errado, tente novamente mais tarde.' });
  next(err)
});


// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});