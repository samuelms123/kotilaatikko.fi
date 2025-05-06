/**
 * @api {post} /meals Add a new meal
 * @apiName AddMeal
 * @apiGroup Meals
 * @apiPermission admin
 *
 * @apiDescription Adds a new meal along with its category and ingredients. If the category or ingredients don't exist, they will be created.
 *
 * @apiHeader {String} Authorization User's access token (Bearer Token).
 * @apiHeader {String} Content-Type multipart/form-data (for file upload)
 *
 * @apiBody {String} mealName Name of the meal.
 * @apiBody {Number} mealPrice Price of the meal.
 * @apiBody {String} mealDescription Description of the meal.
 * @apiBody {String} categoryName Name of the category (either existing or new).
 * @apiBody {String} categoryDescription Description of the category.
 * @apiBody {File} [image] Meal image file (optional).
 * @apiBody {Object[]} ingredients Array of ingredient objects.
 * @apiBody {String} name Ingredient name.
 * @apiBody {Number} Ingredient price (optional).
 * @apiBody {String} Ingredient description (optional).
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} mealId ID of the newly created meal.
 * @apiSuccess {Number} mealCategory ID of the meal's category.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Meal, category and ingredients added successfully",
 *       "mealId": 5,
 *       "mealCategory": 3
 *     }
 *
 * @apiError (Error 500) {String} message Error message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Failed to add meal"
 *     }
 */

/**
 * @api {get} /meals Get all meals
 * @apiName GetAllMeals
 * @apiGroup Meals
 *
 * @apiDescription Retrieves a list of all meals with basic information.
 *
 * @apiSuccess {Object[]} meals Array of meal objects.
 * @apiSuccess {Number} meals.id Meal ID.
 * @apiSuccess {String} meals.name Meal name.
 * @apiSuccess {Number} meals.price Meal price.
 * @apiSuccess {String} meals.description Meal description.
 * @apiSuccess {String} meals.image Meal image path.
 * @apiSuccess {String} meals.category Meal category name.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "name": "Pasta Carbonara",
 *         "price": 12.99,
 *         "description": "Classic Italian pasta dish",
 *         "image": "/uploads/pasta.jpg",
 *         "category": "Italian"
 *       }
 *     ]
 *
 * @apiError (Error 500) {String} message Error message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Failed to fetch meals"
 *     }
 */

/**
 * @api {get} /meals/:id Get meal details
 * @apiName GetMealDetails
 * @apiGroup Meals
 *
 * @apiDescription Retrieves detailed information about a specific meal including its ingredients.
 *
 * @apiBody {Number} id Meal's unique ID.
 *
 * @apiSuccess {Number} id Meal ID.
 * @apiSuccess {String} name Meal name.
 * @apiSuccess {Number} price Meal price.
 * @apiSuccess {String} description Meal description.
 * @apiSuccess {String} image Meal image path.
 * @apiSuccess {Object} category Meal category details.
 * @apiSuccess {Number} category.id Category ID.
 * @apiSuccess {String} category.name Category name.
 * @apiSuccess {String} category.description Category description.
 * @apiSuccess {Object[]} ingredients Array of ingredient objects.
 * @apiSuccess {Number} ingredients.id Ingredient ID.
 * @apiSuccess {String} ingredients.name Ingredient name.
 * @apiSuccess {Number} ingredients.price Ingredient price.
 * @apiSuccess {String} ingredients.description Ingredient description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Pasta Carbonara",
 *       "price": 12.99,
 *       "description": "Classic Italian pasta dish",
 *       "image": "/uploads/pasta.jpg",
 *       "category": {
 *         "id": 3,
 *         "name": "Italian",
 *         "description": "Traditional Italian dishes"
 *       },
 *       "ingredients": [
 *         {
 *           "id": 1,
 *           "name": "Pasta",
 *           "price": 2.99,
 *           "description": "Spaghetti pasta",
 *           "unit": null,
 *         }
 *       ]
 *     }
 *
 * @apiError (Error 404) {String} message Meal not found.
 * @apiError (Error 500) {String} message Error message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Meal not found"
 *     }
 */

/**
 * @api {get} /meals/category/:id Get meals by category
 * @apiName GetMealsByCategory
 * @apiGroup Meals
 *
 * @apiDescription Retrieves all meals belonging to a specific category.
 *
 * @apiBody {Number} id Category's unique ID.
 *
 * @apiSuccess {Object[]} meals Array of meal objects.
 * @apiSuccess {Number} meals.id Meal ID.
 * @apiSuccess {String} meals.name Meal name.
 * @apiSuccess {Number} meals.price Meal price.
 * @apiSuccess {String} meals.description Meal description.
 * @apiSuccess {String} meals.image Meal image path.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "name": "Pasta Carbonara",
 *         "price": 12.99,
 *         "description": "Classic Italian pasta dish"
 *       }
 *     ]
 *
 * @apiError (Error 500) {String} message Error message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Failed to fetch meals"
 *     }
 */

/**
 * @api {delete} /meals/:id Delete a meal
 * @apiName DeleteMeal
 * @apiGroup Meals
 * @apiPermission admin
 *
 * @apiDescription Deletes a meal and unlinks all its relationships with categories and ingredients.
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiBody {Number} id Meal's unique ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Meal deleted successfully"
 *     }
 *
 * @apiError (Error 404) {String} message Meal not found.
 * @apiError (Error 500) {String} message Error message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Meal not found"
 *     }
 */

import {
  addCategory,
  addIngredient,
  addMeal,
  findCategoryByName,
  findIngredientByName,
  getAllMeals,
  linkMealCategory,
  linkMealIngredients,
  deleteMeal,
  unlinkMealCategories,
  unlinkMealIngredients,
  getMealDetails,
  getMealsByCategoryId,
} from '../models/mealModel.js';

const handleAddMeal = async (req, res) => {
  /*
  1. add meal
  2. check if category exists
  3. ? add category
  4. link meal-category
  5. loop ingredients and check if exists by name
  6. ? add ingredient and push to empty list
  7. loop the new list and link ingredients to meal
  */

  const {
    mealName,
    mealPrice,
    mealDescription,
    categoryName,
    categoryDescription,
    ingredients = [],
  } = req.body;

  // Get the uploaded image filename if it exists
  console.log(req.file);
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const meal = {
    name: mealName,
    price: mealPrice,
    description: mealDescription,
    image: imagePath,
  };
  const category = {name: categoryName, description: categoryDescription};

  try {
    const newMeal = await addMeal(meal);

    let categoryFound = await findCategoryByName(categoryName);

    if (!categoryFound) {
      categoryFound = await addCategory(category);
    }

    await linkMealCategory(newMeal.id, categoryFound.id);

    let ingredientIds = [];

    for (const ingredient of ingredients) {
      let foundIngredient = await findIngredientByName(ingredient.name);

      if (!foundIngredient) {
        foundIngredient = await addIngredient(ingredient);
      }

      ingredientIds.push(foundIngredient.id);
    }

    await linkMealIngredients(newMeal.id, ingredientIds);
    res.status(201).json({
      message: 'Meal, category and ingredients added successfully',
      mealId: newMeal.id,
      mealCategory: categoryFound.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to add meal'});
  }
};

const handleGetAllMeals = async (req, res) => {
  try {
    const meals = await getAllMeals();
    res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to fetch meals'});
  }
};

const handleGetMealsByCategoryId = async (req, res) => {
  try {
    const meals = await getMealsByCategoryId(req.params.id);
    res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to fetch meals'});
  }
};

const handleGetMealDetails = async (req, res) => {
  try {
    const mealDetails = await getMealDetails(req.params.id);
    if (!mealDetails) {
      return res.status(404).json({message: 'Meal not found'});
    }

    res.status(200).json(mealDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to fetch meals'});
  }
};

const handleDeleteMeal = async (req, res) => {
  const {id} = req.params;

  try {
    // First unlink all relationships
    await unlinkMealCategories(id);
    await unlinkMealIngredients(id);

    // Then delete the meal
    const result = await deleteMeal(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'Meal not found'});
    }

    res.status(200).json({message: 'Meal deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to delete meal'});
  }
};

export {
  handleAddMeal,
  handleGetAllMeals,
  handleDeleteMeal,
  handleGetMealDetails,
  handleGetMealsByCategoryId,
};
