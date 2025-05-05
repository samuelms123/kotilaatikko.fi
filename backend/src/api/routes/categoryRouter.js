import express from 'express';
import {
  handleGetAllCategories,
  handleGetCategoryById,
  handleGetCategoryPrice,
  handleDeleteCategory,
} from '../controllers/categoryController.js';
import {adminCheck, authenticateToken} from '../../middlewares.js';

const categoryRouter = express.Router();

categoryRouter.route('/').get(handleGetAllCategories);
categoryRouter.route('/:id').get(handleGetCategoryById);
categoryRouter.route('/:id/price').get(handleGetCategoryPrice);
categoryRouter.delete(
  '/:id',
  authenticateToken,
  adminCheck,
  handleDeleteCategory,
);

export default categoryRouter;
