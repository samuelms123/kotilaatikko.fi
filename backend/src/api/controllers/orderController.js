import {
  getOrders,
  getOrderDetailsById,
  postOrder,
  deleteOrder,
  getOrdersByUserId,
  getMostOrderedMeal
} from '../models/orderModel.js';

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
    res.status(500).json({message: 'Failed to fetch orders (controller)'});
  }
};

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

const handleDeleteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await deleteOrder(orderId);
    res.status(200).json({message: 'Order deleted successfully', result});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

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
