import promisePool from '../../utils/database.js';

const getAllMeals = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM meals');
    return rows;
  } catch (error) {
    console.error('Error fetching meals:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const addMeal = async (meal) => {
  const {name, price, description} = meal;

  const sql = `INSERT INTO meals (name, price, description)
                   VALUES (?, ?, ?)`;

  const params = [name, price, description];

  try {
    const [rows] = await promisePool.execute(sql, params);
    console.log('Rows affected:', rows);

    if (rows.affectedRows === 0) {
      return null;
    }
    return {id: rows.insertId};
  } catch (error) {
    console.error('Error inserting meal:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const findCategoryByName = async (name) => {
  const sql = `SELECT id FROM categories WHERE name = ?`;
  const [rows] = await promisePool.execute(sql, [name]);

  return rows[0];
};

const addCategory = async (category) => {
  const {name, description} = category;

  const sql = `INSERT INTO categories (name, description)
                   VALUES (?, ?)`;

  const params = [name, description];

  try {
    const [rows] = await promisePool.execute(sql, params);
    console.log('Rows affected:', rows);

    if (rows.affectedRows === 0) {
      return null;
    }
    return {id: rows.insertId};
  } catch (error) {
    console.error('Error inserting category:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const linkMealCategory = async (mealId, categoryId) => {
  const params = [mealId, categoryId];
  const sql = `INSERT INTO meals_categories (meal_id, category_id) VALUES (?,?)`;

  try {
    const [rows] = await promisePool.execute(sql, params);
    console.log('Rows affected:', rows);

    if (rows.affectedRows === 0) {
      return null;
    }
    return {message: 'linked succesfully'};
  } catch (error) {
    console.error('Error in linking:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const findIngredientByName = async (name) => {
  const sql = `SELECT id FROM ingredients WHERE name = ?`;
  const [rows] = await promisePool.execute(sql, [name]);

  return rows[0];
};

const addIngredient = async (ingredient) => {
  const {name, price, description} = ingredient;

  const sql = `INSERT INTO ingredients (name, price, description)
                   VALUES (?, ?, ?)`;

  const params = [name, price, description];

  try {
    const [rows] = await promisePool.execute(sql, params);
    console.log('Rows affected:', rows);

    if (rows.affectedRows === 0) {
      return null;
    }
    return {id: rows.insertId};
  } catch (error) {
    console.error('Error inserting ingredient:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const linkMealIngredients = async (mealId, ingredientIds) => {
  const sql = `INSERT INTO meals_ingredients (meal_id, ingredient_id) VALUES (?, ?)`;

  try {
    const queries = ingredientIds.map((ingredientId) =>
      promisePool.execute(sql, [mealId, ingredientId]),
    );

    const results = await Promise.all(queries);

    const allSuccessful = results.every(([rows]) => rows.affectedRows > 0);

    if (!allSuccessful) {
      throw new Error('Failed to link ingredietns.');
    }

    return {message: 'Ingredients linked successfully'};
  } catch (error) {
    console.error('Error linking ingredients:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

export {
  addMeal,
  findCategoryByName,
  addCategory,
  linkMealCategory,
  findIngredientByName,
  addIngredient,
  linkMealIngredients,
  getAllMeals,
};
