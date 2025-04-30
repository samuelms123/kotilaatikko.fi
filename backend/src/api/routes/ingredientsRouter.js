import express from 'express';
import {getAllIngredients} from '../controllers/ingredientController.js';

const ingredientsRouter = express.Router();

router.get('/', getAllIngredients).delete('/:id', deleteIngredient);

export default ingredientsRouter;
