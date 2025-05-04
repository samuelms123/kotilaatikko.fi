import express from 'express';
import {
  handleAddMeal,
  handleGetAllMeals,
  handleDeleteMeal,
  handleGetMealDetails,
  handleGetMealsByCategoryId,
} from '../controllers/mealController.js';
import {uploadSingleImage} from '../../utils/fileUpload.js';
import {adminCheck, authenticateToken} from '../../middlewares.js';

const mealRouter = express.Router();

mealRouter
  .route('/')
  .post(
    authenticateToken,
    adminCheck,
    uploadSingleImage('image'),
    handleAddMeal,
  )
  .get(handleGetAllMeals);

mealRouter.route('/category/:id').get(handleGetMealsByCategoryId); // todo search functionality

mealRouter
  .route('/:id')
  .delete(authenticateToken, adminCheck, handleDeleteMeal)
  .get(handleGetMealDetails);
//.patch(uploadSingleImage('image'), handleUpdateMeal); // todo update functionality

export default mealRouter;
