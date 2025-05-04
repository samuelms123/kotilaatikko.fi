import promisePool from '../../utils/database.js';

// SELECT
// o.*,
// u.first_name,
// u.last_name,
// u.email,
// m.id AS meal_id,
// m.name AS meal_name,
// m.price AS meal_price,
// m.description AS meal_description,
// om.quantity
// FROM
// orders o
// JOIN
// users u ON o.user_id = u.id
// JOIN
// order_meals om ON o.id = om.order_id
// JOIN
// meals m ON om.meal_id = m.id;

const getOrders = async () => {
  try {
    const [rows] = await promisePool.execute(`
        SELECT
            o.id AS order_id,
            o.date AS order_date,
            CONCAT(u.first_name, ' ', u.last_name) AS orderer
        FROM
            orders o
        JOIN
            users u ON o.user_id = u.id;
              `);
            console.log('Rows affected:', rows);
    return rows;
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};


export {
  getOrders,
};
