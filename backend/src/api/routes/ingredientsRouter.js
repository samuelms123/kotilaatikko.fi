import express from 'express';
import {
  handleDeleteIngredient,
  handleGetAllIngredients,
} from '../controllers/ingredientsController.js';
import {adminCheck, authenticateToken} from '../../middlewares.js';

const ingredientsRouter = express.Router();

ingredientsRouter
  .get('/', handleGetAllIngredients)
  .delete('/:id', authenticateToken, adminCheck, handleDeleteIngredient);

export default ingredientsRouter;
