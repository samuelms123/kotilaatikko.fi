import express from 'express';
import {
  handleAddMeal,
  handleGetAllMeals,
} from '../controllers/mealController.js';

const mealRouter = express.Router();

mealRouter.route('/').post(handleAddMeal).get(handleGetAllMeals);

export default mealRouter;
