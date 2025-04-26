import express from 'express';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import mealRouter from './routes/mealRouter.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/meals', mealRouter);

export default router;
