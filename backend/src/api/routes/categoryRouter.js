import express from 'express';
import {
  handleGetAllCategories,
  handleGetCategoryById,
  handleGetCategoryPrice,
} from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.route('/').get(handleGetAllCategories);
categoryRouter.route('/:id').get(handleGetCategoryById);
categoryRouter.route('/:id/price').get(handleGetCategoryPrice);

export default categoryRouter;
