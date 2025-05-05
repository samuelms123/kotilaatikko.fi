import express from 'express';
import {handleGetOrders, handleGetOrderDetailsById, handlePostOrder, handleDeleteOrder} from '../controllers/orderController.js';
import {adminCheck, authenticateToken} from '../../middlewares.js';
const orderRouter = express.Router();

orderRouter.route('/').get(authenticateToken, adminCheck, handleGetOrders);
orderRouter.route('/:id').get(authenticateToken, adminCheck, handleGetOrderDetailsById);

orderRouter.route('/').post(authenticateToken, adminCheck, handlePostOrder);
orderRouter.route('/:id').delete(authenticateToken, adminCheck, handleDeleteOrder);


export default orderRouter;
