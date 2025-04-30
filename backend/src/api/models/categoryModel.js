import promisePool from '../../utils/database.js';

const getallCategories = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM categories');

    return rows;
  } catch (error) {
    console.error('Error fetching meals:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const getCategoryPriceById = async (id) => {
  try {
    const [categoryPrice] = await promisePool.execute(
      `SELECT SUM(m.price) AS total_price
      FROM meals m
      JOIN meals_categories mc ON m.id = mc.meal_id
      JOIN categories c ON mc.category_id = c.id
      WHERE c.id = ?
      GROUP BY c.name;`,
      [id],
    );
    const price = categoryPrice[0]?.total_price || 0;

    console.log('Category price:', price);

    return {price: price};
  } catch (error) {
    console.error('Error fetching meals:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const getCategoryById = async (id) => {
  try {
    // Get category by id
    const [categoryRows] = await promisePool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [id],
    );
    const category = categoryRows[0];

    if (!category) {
      throw new Error('Category not found');
    }

    // Get meals
    const [mealsRows] = await promisePool.execute(
      `SELECT m.name, m.price
       FROM meals m
       JOIN meals_categories mc ON m.id = mc.meal_id
       WHERE mc.category_id = ?`,
      [id],
    );

    const [categoryPrice] = await promisePool.execute(
      `SELECT SUM(m.price) AS total_price
      FROM meals m
      JOIN meals_categories mc ON m.id = mc.meal_id
      JOIN categories c ON mc.category_id = c.id
      WHERE c.id = ?
      GROUP BY c.name;`,
      [id],
    );
    const price = categoryPrice[0]?.total_price || 0;

    return {
      category,
      price: price,
      meals: mealsRows || [], // Return the entire mealsRows array
    };
  } catch (error) {
    console.error('Error fetching meal details:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

export {
  getallCategories,
  getCategoryById,
  getCategoryPriceById,
};
