import express from 'express';
import {
  handleAddMeal,
  handleGetAllMeals,
  handleDeleteMeal,
  handleGetMealDetails,
} from '../controllers/mealController.js';

const mealRouter = express.Router();

mealRouter.route('/').post(handleAddMeal).get(handleGetAllMeals);

mealRouter.route('/:id').delete(handleDeleteMeal).get(handleGetMealDetails);

export default mealRouter;
