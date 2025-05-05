import {
  getallCategories,
  getCategoryById,
  getCategoryPriceById,
  deleteCategory,
} from '../models/categoryModel.js';

const handleDeleteCategory = async (req, res) => {
  try {
    const success = await deleteCategory(req.params.id);
    if (!success) {
      return res.status(404).json({message: 'Category not found'});
    }
    res.status(204).end(); // No Content response for successful deletion
  } catch (error) {
    res
      .status(400)
      .json({message: 'Failed to delete Category', error: error.message});
  }
};

const handleGetAllCategories = async (req, res) => {
  try {
    const categories = await getallCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to fetch categories.'});
  }
};

const handleGetCategoryPrice = async (req, res) => {
  try {
    const {id} = req.params; // Get the category ID from the request parameters
    const price = await getCategoryPriceById(id);
    res.status(200).json(price);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to fetch categories.'});
  }
};

const handleGetCategoryById = async (req, res) => {
  try {
    const {id} = req.params; // Get the category ID from the request parameters
    const result = await getCategoryById(id); // Call the model function

    if (!result) {
      return res.status(404).json({error: 'Category not found'});
    }

    res.json(result); // Send the result as the response
  } catch (error) {
    console.error('Error in handleGetCategoryDetails:', error.message);
    res.status(500).json({error: error.message});
  }
};

export {
  handleGetAllCategories,
  handleGetCategoryById,
  handleGetCategoryPrice,
  handleDeleteCategory,
};
