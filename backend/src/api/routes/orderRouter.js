import express from 'express';
import {
  handleGetOrders,
  handleGetOrderDetailsById,
  handlePostOrder,
  handleDeleteOrder,
  handleGetOrderByUserId,
  handleGetMostOrderedMeal,
} from '../controllers/orderController.js';
import {adminCheck, authenticateToken} from '../../middlewares.js';
const orderRouter = express.Router();

orderRouter.route('/most-ordered').get(handleGetMostOrderedMeal);

orderRouter.route('/').get(authenticateToken, adminCheck, handleGetOrders);
orderRouter
  .route('/:id')
  .get(authenticateToken, adminCheck, handleGetOrderDetailsById);

orderRouter.route('/').post(authenticateToken, handlePostOrder);
orderRouter
  .route('/:id')
  .delete(authenticateToken, adminCheck, handleDeleteOrder);

orderRouter.route('/user/:id').get(authenticateToken, handleGetOrderByUserId);


export default orderRouter;
