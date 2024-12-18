import express from 'express';
import { signup, login } from '../controllers/authController';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
router.post('/signup', asyncHandler(signup));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
router.post('/login', asyncHandler(login));

export default router;
