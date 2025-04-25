import express from 'express';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
