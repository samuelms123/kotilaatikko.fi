import {
  getallCategories,
  getCategoryById,
  getCategoryPriceById,
  deleteCategory,
} from '../models/categoryModel.js';


/**
 * @api {delete} /categories/:id Delete a category
 * @apiName DeleteCategory
 * @apiGroup Categories
 * @apiHeader {String} Authorization Bearer token for admin access.
 *
 * @apiParam {Number} id Category ID.
 *
 * @apiSuccess {Boolean} success Indicates whether the category was successfully deleted.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true
 * }
 *
 * @apiError {String} message Error message if the category could not be deleted.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Database error: Category not found"
 * }
 */
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

/**
 * @api {get} /categories Get all categories
 * @apiName GetAllCategories
 * @apiGroup Categories
 *
 * @apiSuccess {Object[]} categories List of all categories.
 * @apiSuccess {Number} categories.id Category ID.
 * @apiSuccess {String} categories.name Category name.
 * @apiSuccess {String} categories.description Category description.
 * @apiSuccess {String} [categories.image] URL of the category image (if available).
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 12,
 *     "name": "Sekäsyöjät",
 *     "description": "Sekasyöjä on henkilö, joka syö sekaravintoa eli sekä kasvi- että eläinkunnan tuotteita – niin kasviksia, lihaa, kalaa, munia kuin maitotuotteitakin.",
 *     "image": null
 *   },
 *   {
 *     "id": 13,
 *     "name": "Kasvissyöjät",
 *     "description": "Kasvissyöjä eli vegetaristi on laaja termi. Sitä käytetään ihmisistä, jotka syövät rajatusti eläinkunnan tuotteita tai syövät ainoastaan kasvikunnan tuotteita. Termin alle mahtuu monia erilaisia kasvissyönnin muotoja, joista lakto-ovo-vegetaristi, laktovegetaristi ja vegaani ovat varsinaisia kasvissyöjiä.",
 *     "image": null
 *   },
 *   {
 *     "id": 14,
 *     "name": "Vegaani",
 *     "description": "Herkullisia ruokia vegaaneille.",
 *     "image": null
 *   }
 * ]
 *
 * @apiError {String} message Error message if categories could not be fetched.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Database error: Failed to fetch categories"
 * }
 */
const handleGetAllCategories = async (req, res) => {
  try {
    const categories = await getallCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to fetch categories.'});
  }
};


/**
 * @api {get} /categories/:id/price Get total price of meals in a category
 * @apiName GetCategoryPriceById
 * @apiGroup Categories
 *
 * @apiParam {Number} id Category ID.
 *
 * @apiSuccess {Number} price Total price of all meals in the category.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "price": 45
 * }
 *
 * @apiError {String} message Error message if the price could not be fetched.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Database error: Failed to fetch category price"
 * }
 */
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


/**
 * @api {get} /categories/:id Get category details by ID
 * @apiName GetCategoryById
 * @apiGroup Categories
 * @apiHeader {String} Authorization Bearer token for admin access.
 *
 * @apiParam {Number} id Category ID.
 *
 * @apiSuccess {Object} category Category details.
 * @apiSuccess {Number} category.id Category ID.
 * @apiSuccess {String} category.name Category name.
 * @apiSuccess {String} category.description Category description.
 * @apiSuccess {String} [category.image] URL of the category image (if available).
 * @apiSuccess {String} price Total price of all meals in the category.
 * @apiSuccess {Object[]} meals List of meals in the category.
 * @apiSuccess {String} meals.name Meal name.
 * @apiSuccess {String} meals.price Meal price.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "category": {
 *     "id": 12,
 *     "name": "Sekäsyöjät",
 *     "description": "Sekasyöjä on henkilö, joka syö sekaravintoa eli sekä kasvi- että eläinkunnan tuotteita – niin kasviksia, lihaa, kalaa, munia kuin maitotuotteitakin.",
 *     "image": null
 *   },
 *   "price": "21.00",
 *   "meals": [
 *     {
 *       "name": "Makaroonilaatikko",
 *       "price": "6.00"
 *     },
 *     {
 *       "name": "Maksalaatikko",
 *       "price": "5.00"
 *     },
 *     {
 *       "name": "Peltiburgerit",
 *       "price": "10.00"
 *     }
 *   ]
 * }
 *
 * @apiError {String} message Error message if the category could not be fetched.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Database error: Category not found"
 * }
 */
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
