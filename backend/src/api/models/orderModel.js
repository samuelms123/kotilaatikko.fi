import promisePool from '../../utils/database.js';

const getOrders = async () => {
  try {
    const [rows] = await promisePool.execute(`
                  SELECT
                    o.id AS order_id,
                    o.date,
                    u.id AS user_id,
                    u.first_name,
                    u.last_name,
                    u.email,
                    JSON_ARRAYAGG(
                      JSON_OBJECT(
                        'meal_id', m.id,
                        'name', m.name,
                        'price', m.price,
                        'description', m.description,
                        'quantity', om.quantity
                      )
                    ) AS meals,
                    SUM(m.price * om.quantity) AS total_price
                  FROM orders o
                  JOIN users u ON o.user_id = u.id
                  JOIN order_meals om ON o.id = om.order_id
                  JOIN meals m ON om.meal_id = m.id
                  GROUP BY o.id;
              `);
    console.log('Rows affected:', rows);
    return rows;
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const getOrderDetailsById = async (orderId) => {
  const [rows] = await promisePool.execute(
    `
    SELECT JSON_OBJECT(
      'order_id', o.id,
      'order_date', o.date,
      'user', JSON_OBJECT(
        'first_name', u.first_name,
        'last_name', u.last_name,
        'email', u.email
      ),
      'total_price', SUM(m.price * om.quantity),
      'meals', JSON_ARRAYAGG(
        JSON_OBJECT(
          'meal_id', m.id,
          'meal_name', m.name,
          'meal_price', m.price,
          'quantity', om.quantity,
          'total_price', m.price * om.quantity,
          'meal_description', m.description,
          'meal_image', m.image,
          'ingredients', (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'ingredient_id', i.id,
                'ingredient_name', i.name,
                'allergens', (
                  SELECT JSON_ARRAYAGG(a.name)
                  FROM project.ingredients_allergens ia
                  JOIN project.allergens a ON ia.allergen_id = a.id
                  WHERE ia.ingredient_id = i.id
                )
              )
            )
            FROM project.meals_ingredients mi
            JOIN project.ingredients i ON mi.ingredient_id = i.id
            WHERE mi.meal_id = m.id
          )
        )
      )
    ) AS order_details
    FROM project.orders o
    JOIN project.users u ON o.user_id = u.id
    JOIN project.order_meals om ON om.order_id = o.id
    JOIN project.meals m ON om.meal_id = m.id
    WHERE o.id = ?
    GROUP BY o.id, o.date, u.first_name, u.last_name, u.email
  `,
    [orderId],
  );

  return rows[0]; // returns one row with JSON string
};

const postOrder = async (userId, meals) => {
  try {
    const [orderResult] = await promisePool.execute(
      'INSERT INTO orders (user_id, date) VALUES (?, CURDATE())',
      [userId],
    );
    const orderId = orderResult.insertId;
    console.log('orderId:', orderId);

    for (const meal of meals) {
      console.log('mealID:', meal.id);
      console.log('mealQuantity:', meal.quantity);

      await promisePool.execute(
        'INSERT INTO order_meals (order_id, meal_id, quantity) VALUES (?, ?, ?)',
        [orderId, meal.id, meal.quantity],
      );
    }

    return {success: true, orderId};
  } catch (err) {
    throw err;
  }
};

const deleteOrder = async (orderId) => {
  try {
    await promisePool.execute('DELETE FROM order_meals WHERE order_id = ?', [
      orderId,
    ]);
    await promisePool.execute('DELETE FROM orders WHERE id = ?', [orderId]);

    return {success: true};
  } catch (err) {
    throw new Error('Failed to delete order: ' + err.message);
  }
};

const getOrdersByUserId = async (userId) => {
  const [rows] = await promisePool.execute(`
    SELECT JSON_OBJECT(
      'order_id', o.id,
      'order_date', o.date,
      'total_price', SUM(m.price * om.quantity),
      'meals', JSON_ARRAYAGG(
        JSON_OBJECT(
          'meal_id', m.id,
          'meal_name', m.name,
          'meal_price', m.price,
          'quantity', om.quantity,
          'total_price', m.price * om.quantity
        )
      )
    ) AS order_details
    FROM project.orders o
    JOIN project.order_meals om ON om.order_id = o.id
    JOIN project.meals m ON om.meal_id = m.id
    WHERE o.user_id = ?
    GROUP BY o.id, o.date
  `, [userId]);

  return rows;
};

const getMostOrderedMeal = async () => {
  const [rows] = await promisePool.execute(`
    SELECT
      m.id AS meal_id,
      m.name AS meal_name,
      m.price AS meal_price,
      m.description AS meal_description,
      m.image AS meal_image,
      SUM(om.quantity) AS total_ordered
    FROM project.order_meals om
    JOIN project.meals m ON om.meal_id = m.id
    GROUP BY m.id, m.name, m.price, m.description, m.image
    ORDER BY total_ordered DESC
    LIMIT 1
  `);

  return rows[0];
};

export {getOrders, getOrderDetailsById, postOrder, deleteOrder, getOrdersByUserId, getMostOrderedMeal};
