import express from 'express';
import {
  handleDeleteIngredient,
  handleGetAllIngredients,
} from '../controllers/ingredientsController.js';

const ingredientsRouter = express.Router();

ingredientsRouter
  .get('/', handleGetAllIngredients)
  .delete('/:id', handleDeleteIngredient);

export default ingredientsRouter;
