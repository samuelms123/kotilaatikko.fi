import express from 'express';
import {handleAddMeal} from '../controllers/mealController.js';

const mealRouter = express.Router();

mealRouter.route('/').post(handleAddMeal);

export default mealRouter;
