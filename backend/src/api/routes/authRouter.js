import express from 'express';
import {
  authenticateToken,
  getMe,
  handleLogin,
} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.route('/login').post(handleLogin);
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
