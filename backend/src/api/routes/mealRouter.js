import express from 'express';
import {
  handleAddMeal,
  handleGetAllMeals,
  handleDeleteMeal,
  handleGetMealDetails,
} from '../controllers/mealController.js';
import {uploadSingleImage} from '../utils/fileUpload.js';

const mealRouter = express.Router();

mealRouter
  .route('/')
  .post(uploadSingleImage('image'), handleAddMeal)
  .get(handleGetAllMeals);

mealRouter.route('/:id').delete(handleDeleteMeal).get(handleGetMealDetails);
//.patch(uploadSingleImage('image'), handleUpdateMeal); // todo update functionality

export default mealRouter;
