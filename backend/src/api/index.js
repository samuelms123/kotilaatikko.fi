import express from 'express';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import mealRouter from './routes/mealRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import newsletterRouter from './routes/newsletterRouter.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/meals', mealRouter);
router.use('/categories', categoryRouter);
router.use('/newsletter', newsletterRouter);

export default router;
