import express from 'express';
import {handleLogin} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.route('/login').post(handleLogin);

export default authRouter;
