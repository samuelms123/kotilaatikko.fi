import {deleteIngredient} from '../models/ingredientsModel.js';
import {getAllIngredients} from '../models/ingredientsModel.js';

const handleGetAllIngredients = async (req, res) => {
  try {
    const ingredients = await getAllIngredients();
    res.status(200).json(ingredients);
  } catch (error) {
    res
      .status(500)
      .json({message: 'Failed to fetch ingredients', error: error.message});
  }
};

const handleDeleteIngredient = async (req, res) => {
  try {
    const success = await deleteIngredient(req.params.id);
    if (!success) {
      return res.status(404).json({message: 'Ingredient not found'});
    }
    res.status(204).end(); // No Content response for successful deletion
  } catch (error) {
    res
      .status(400)
      .json({message: 'Failed to delete ingredient', error: error.message});
  }
};

export {handleGetAllIngredients, handleDeleteIngredient};
