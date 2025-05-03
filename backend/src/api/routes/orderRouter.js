import express from 'express';
import {handleGetOrders} from '../controllers/orderController.js';
const orderRouter = express.Router();

orderRouter.route('/').get(handleGetOrders);
//   .post(uploadSingleImage('image'), handleAddMeal)
//   .get(handleGetAllMeals);

//   orderRouter.route('/category/:id').get(handleGetMealsByCategoryId); // todo search functionality

// orderRouter.route('/:id').delete(handleDeleteMeal).get(handleGetMealDetails);
// //.patch(uploadSingleImage('image'), handleUpdateMeal); // todo update functionality

export default orderRouter;
