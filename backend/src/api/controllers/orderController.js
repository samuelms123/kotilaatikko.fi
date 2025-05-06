import {
  getOrders,
  getOrderDetailsById,
  postOrder,
  deleteOrder,
  getOrdersByUserId,
  getMostOrderedMeal
} from '../models/orderModel.js';



/**
 * @api {get} /orders Get all orders
 * @apiName GetOrders
 * @apiGroup Orders
 * @apiHeader {String} Authorization Bearer token for admin access JWT Token.
 *
 * @apiSuccess {Object[]} orders List of orders.
 * @apiSuccess {Number} orders.order_id Order ID.
 * @apiSuccess {String} orders.date Order date (ISO format).
 * @apiSuccess {Number} orders.user_id User ID of the customer.
 * @apiSuccess {String} orders.first_name Customer's first name.
 * @apiSuccess {String} orders.last_name Customer's last name.
 * @apiSuccess {String} orders.email Customer's email address.
 * @apiSuccess {Object[]} orders.meals List of meals in the order.
 * @apiSuccess {Number} orders.meals.meal_id Meal ID.
 * @apiSuccess {String} orders.meals.name Meal name.
 * @apiSuccess {Number} orders.meals.price Meal price.
 * @apiSuccess {String} orders.meals.description Meal description.
 * @apiSuccess {Number} orders.meals.quantity Quantity of the meal ordered.
 * @apiSuccess {String} orders.total_price Total price of the order.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "order_id": 34,
 *     "date": "2025-05-05T21:00:00.000Z",
 *     "user_id": 36,
 *     "first_name": "adminin nimi",
 *     "last_name": "adminin sukunimi",
 *     "email": "admin@admin.com",
 *     "meals": [
 *       {
 *         "meal_id": 40,
 *         "name": "Makaroonilaatikko",
 *         "price": 6,
 *         "description": "Kuvaus: Tässä yksi suomalaisten suosituimmista ruuista: makaronilaatikko jauhelihasta munamaidolla.",
 *         "quantity": 5
 *       }
 *     ],
 *     "total_price": "30.00"
 *   }
 * ]
 */

const handleGetOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    const parsed = orders.map((order) => ({
      ...order,
      meals: JSON.parse(order.meals),
    }));
    res.status(200).json(parsed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch orders (controller)' });
  }
};


/**
 * @api {get} /orders/:id Get order details by ID
 * @apiName GetOrderDetailsById
 * @apiGroup Orders
 * @apiHeader {String} Authorization Bearer token for admin access.
 *
 * @apiParam {Number} id Order ID.
 *
 * @apiSuccess {Object} order Order details.
 * @apiSuccess {Number} order.order_id Order ID.
 * @apiSuccess {String} order.order_date Order date.
 * @apiSuccess {Object} order.user User details.
 * @apiSuccess {String} order.user.first_name Customer's first name.
 * @apiSuccess {String} order.user.last_name Customer's last name.
 * @apiSuccess {String} order.user.email Customer's email address.
 * @apiSuccess {Number} order.total_price Total price of the order.
 * @apiSuccess {Object[]} order.meals List of meals in the order.
 * @apiSuccess {Number} order.meals.meal_id Meal ID.
 * @apiSuccess {String} order.meals.meal_name Meal name.
 * @apiSuccess {Number} order.meals.meal_price Meal price.
 * @apiSuccess {Number} order.meals.quantity Quantity of the meal ordered.
 * @apiSuccess {Number} order.meals.total_price Total price for the meal.
 * @apiSuccess {String} order.meals.meal_description Meal description.
 * @apiSuccess {String} order.meals.meal_image URL of the meal image.
 * @apiSuccess {Object[]} order.meals.ingredients List of ingredients in the meal.
 * @apiSuccess {Number} order.meals.ingredients.ingredient_id Ingredient ID.
 * @apiSuccess {String} order.meals.ingredients.ingredient_name Ingredient name.
 * @apiSuccess {String} [order.meals.ingredients.allergens] Allergens (if any).
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "order": {
 *     "order_id": 40,
 *     "order_date": "2025-05-06",
 *     "user": {
 *       "first_name": "Niko",
 *       "last_name": "Mehis",
 *       "email": "niko@mehis.com"
 *     },
 *     "total_price": 6,
 *     "meals": [
 *       {
 *         "meal_id": 40,
 *         "meal_name": "Makaroonilaatikko",
 *         "meal_price": 6,
 *         "quantity": 1,
 *         "total_price": 6,
 *         "meal_description": "Kuvaus: Tässä yksi suomalaisten suosituimmista ruuista: makaronilaatikko jauhelihasta munamaidolla.",
 *         "meal_image": "/uploads/image-1746521816534-333672403.jpg",
 *         "ingredients": [
 *           {
 *             "ingredient_id": 19,
 *             "ingredient_name": "Makaroni",
 *             "allergens": null
 *           },
 *           {
 *             "ingredient_id": 23,
 *             "ingredient_name": "Kotimaista sikanauta jauheliha 400g",
 *             "allergens": null
 *           },
 *           {
 *             "ingredient_id": 24,
 *             "ingredient_name": "Maito 1L",
 *             "allergens": null
 *           },
 *           {
 *             "ingredient_id": 25,
 *             "ingredient_name": "Kananmuna 4kpl",
 *             "allergens": null
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * }
 */
const handleGetOrderDetailsById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const result = await getOrderDetailsById(orderId);

    if (!result || !result.order_details) {
      return res.status(404).json({message: 'Order not found'});
    }

    const order = JSON.parse(result.order_details);
    res.json({order});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Failed to fetch order details.'});
  }
};


/**
 * @api {post} /orders Create a new order
 * @apiName PostOrder
 * @apiGroup Orders
 * @apiHeader {String} Authorization User's access token (Bearer Token).
 *
 * @apiBody {Object[]} meals List of meals in the order.
 * @apiBody {Number} meals.meal_id Meal ID.
 * @apiBody {Number} meals.quantity Quantity of the meal.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} orderId ID of the created order.
 */
const handlePostOrder = async (req, res) => {
  const userId = res.locals.user.id;
  const meals = req.body.meals; // [{ meal_id: 1, quantity: 2 }, ...]

  if (!userId || !Array.isArray(meals) || meals.length === 0) {
    return res.status(400).json({error: 'Invalid input'});
  }

  try {
    const result = await postOrder(userId, meals);
    res.status(201).json({message: 'Order created', orderId: result.orderId});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to create order'});
  }
};


/**
 * @api {delete} /orders/:id Delete an order
 * @apiName DeleteOrder
 * @apiGroup Orders
 * @apiHeader {String} Admin Authorization Bearer token.
 *
 * @apiParam {Number} id Order ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Result of the deletion.
 */
const handleDeleteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await deleteOrder(orderId);
    res.status(200).json({message: 'Order deleted successfully', result});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

/**
 * @api {get} /users/:id/orders Get orders by user ID
 * @apiName GetOrdersByUserId
 * @apiGroup Orders
 * @apiHeader {String} Admin Authorization Bearer token.
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {Object[]} orders List of orders.
 * @apiSuccess {Number} orders.id Order ID.
 * @apiSuccess {String} orders.date Order date.
 * @apiSuccess {Object[]} orders.meals List of meals in the order.
 */
const handleGetOrderByUserId = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: 'Missing user ID' });
  }

  try {
    const orders = await getOrdersByUserId(userId);
    res.json({ orders: orders.map(row => JSON.parse(row.order_details)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * @api {get} /orders/most-ordered Get the most ordered meal
 * @apiName GetMostOrderedMeal
 * @apiGroup Orders
 *
 * @apiSuccess {Object} mostOrderedMeal The most ordered meal.
 * @apiSuccess {Number} mostOrderedMeal.meal_id Meal ID.
 * @apiSuccess {String} mostOrderedMeal.meal_name Meal name.
 * @apiSuccess {String} mostOrderedMeal.meal_price Meal price.
 * @apiSuccess {String} mostOrderedMeal.meal_description Meal description.
 * @apiSuccess {String} mostOrderedMeal.meal_image URL of the meal image.
 * @apiSuccess {Number} mostOrderedMeal.total_ordered Total number of times the meal was ordered.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "mostOrderedMeal": {
 *     "meal_id": 40,
 *     "meal_name": "Makaroonilaatikko",
 *     "meal_price": "6.00",
 *     "meal_description": "Kuvaus: Tässä yksi suomalaisten suosituimmista ruuista: makaronilaatikko jauhelihasta munamaidolla.",
 *     "meal_image": "/uploads/image-1746521816534-333672403.jpg",
 *     "total_ordered": "21"
 *   }
 * }
 */
const handleGetMostOrderedMeal = async (req, res) => {
  try {
    const meal = await getMostOrderedMeal();
    res.json({ mostOrderedMeal: meal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

export {
  handleGetOrders,
  handleGetOrderDetailsById,
  handlePostOrder,
  handleDeleteOrder,
  handleGetOrderByUserId,
  handleGetMostOrderedMeal
};
