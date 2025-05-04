import express from 'express';
import {handleGetOrders, handlePostOrder} from '../controllers/orderController.js';
import {adminCheck, authenticateToken} from '../../middlewares.js';
const orderRouter = express.Router();

orderRouter.route('/').get(authenticateToken, adminCheck, handleGetOrders);
orderRouter.route('/').post(authenticateToken, handlePostOrder);

export default orderRouter;
