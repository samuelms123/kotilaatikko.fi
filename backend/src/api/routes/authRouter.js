import express from 'express';
import {handleLogin} from '../controllers/authController.js';
import {getMe} from '../controllers/authController.js';
import {authenticateToken} from '../../middlewares.js';

const authRouter = express.Router();

authRouter.route('/login').post(handleLogin);
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
