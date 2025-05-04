import promisePool from '../../utils/database.js';

const getAllMeals = async () => {
  try {
    const [rows] = await promisePool.execute(`
      SELECT m.*, c.name AS category
      FROM meals m
      JOIN meals_categories mc ON m.id = mc.meal_id
      JOIN categories c ON mc.category_id = c.id
      `);
    return rows;
  } catch (error) {
    console.error('Error fetching meals:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const getMealDetails = async (id) => {
  try {
    // Get meal by id
    const [mealRows] = await promisePool.execute(
      'SELECT * FROM meals WHERE id = ?',
      [id],
    );
    const meal = mealRows[0];

    if (!meal) {
      return null;
    }

    // Get category
    const [categoryRows] = await promisePool.execute(
      `SELECT c.* FROM categories c
       JOIN meals_categories mc ON c.id = mc.category_id
       WHERE mc.meal_id = ?`,
      [id],
    );

    // Get ingredients
    const [ingredients] = await promisePool.execute(
      `SELECT i.* FROM ingredients i
       JOIN meals_ingredients mi ON i.id = mi.ingredient_id
       WHERE mi.meal_id = ?`,
      [id],
    );

    return {
      ...meal,
      category: categoryRows[0] || null,
      ingredients: ingredients || [],
    };
  } catch (error) {
    console.error('Error fetching meal details:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const addMeal = async (meal) => {
  const {name, price, description, image} = meal;

  const sql = `INSERT INTO meals (name, price, description, image)
                   VALUES (?, ?, ?, ?)`;
  const params = [name, price, description, image];

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

const unlinkMealCategories = async (mealId) => {
  const sql = `DELETE FROM meals_categories WHERE meal_id = ?`;
  try {
    const [rows] = await promisePool.execute(sql, [mealId]);
    return rows;
  } catch (error) {
    console.error('Error unlinking categories:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const unlinkMealIngredients = async (mealId) => {
  const sql = `DELETE FROM meals_ingredients WHERE meal_id = ?`;
  try {
    const [rows] = await promisePool.execute(sql, [mealId]);
    return rows;
  } catch (error) {
    console.error('Error unlinking ingredients:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const deleteMeal = async (id) => {
  const sql = `DELETE FROM meals WHERE id = ?`;
  try {
    const [rows] = await promisePool.execute(sql, [id]);
    return rows;
  } catch (error) {
    console.error('Error deleting meal:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const getMealsByCategoryId = async (categoryId) => {
  try {
    // Get meal by id
    const [mealRows] = await promisePool.execute(
      `
        SELECT m.id, m.name, m.price, m.description
        FROM meals AS m
        JOIN meals_categories AS mc ON m.id = mc.meal_id
        WHERE mc.category_id = ?;
      `,
      [categoryId],
    );

    if (!mealRows || mealRows.length === 0) {
      throw new Error('Meals not found');
    }

    return mealRows;
  } catch (error) {
    console.error('Error unlinking categories:', error.message);
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
  unlinkMealCategories,
  unlinkMealIngredients,
  deleteMeal,
  getMealDetails,
  getMealsByCategoryId,
};
