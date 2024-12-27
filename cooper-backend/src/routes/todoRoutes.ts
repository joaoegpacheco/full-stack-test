import express from 'express';
import { getAllTodos, createTodo } from '../controllers/todoController';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
router.post('/todos', createTodo);
router.get('/todos', getAllTodos);

export default router;