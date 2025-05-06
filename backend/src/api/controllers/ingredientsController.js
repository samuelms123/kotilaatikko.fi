/**
 * @api {get} /ingredients Get all ingredients
 * @apiName GetAllIngredients
 * @apiGroup Ingredients
 *
 * @apiDescription Retrieves a list of all ingredients sorted alphabetically by name.
 *
 * @apiSuccess {Object[]} ingredients Array of ingredient objects.
 * @apiSuccess {Number} ingredients.id Ingredient ID.
 * @apiSuccess {String} ingredients.name Ingredient name.
 * @apiSuccess {Number} ingredients.price Ingredient price.
 * @apiSuccess {String} ingredients.description Ingredient description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "name": "Flour",
 *         "price": 1.99,
 *         "description": "All-purpose wheat flour"
 *       },
 *       {
 *         "id": 2,
 *         "name": "Sugar",
 *         "price": 2.49,
 *         "description": "Granulated white sugar"
 *       }
 *     ]
 *
 * @apiError (Error 500) {String} message Error message.
 * @apiError (Error 500) {String} error Detailed error message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Failed to fetch ingredients",
 *       "error": "Database error: Connection failed"
 *     }
 */

/**
 * @api {delete} /ingredients/:id Delete an ingredient
 * @apiName DeleteIngredient
 * @apiGroup Ingredients
 * @apiPermission admin
 *
 * @apiDescription Permanently deletes an ingredient from the database.
 * Note: This should be used with caution as it may affect existing meals that reference this ingredient.
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiBody {Number} id Ingredient's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiError (Error 400) {String} message Error message.
 * @apiError (Error 400) {String} error Detailed error message.
 * @apiError (Error 404) {String} message Ingredient not found.
 *
 * @apiErrorExample Error-Response (Not Found):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Ingredient not found"
 *     }
 *
 * @apiErrorExample Error-Response (Database Error):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Failed to delete ingredient",
 *       "error": "Database error: Foreign key constraint fails"
 *     }
 */

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
