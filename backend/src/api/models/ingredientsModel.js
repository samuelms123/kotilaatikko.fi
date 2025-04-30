import promisePool from '../../utils/database.js';

const getAllIngredients = async () => {
  const sql = `SELECT * FROM ingredients ORDER BY name ASC`;
  try {
    const [rows] = await promisePool.execute(sql);
    return rows;
  } catch (error) {
    console.error('Error fetching ingredients:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const deleteIngredient = async (id) => {
  const sql = `DELETE FROM ingredients WHERE id = ?`;
  try {
    const [result] = await promisePool.execute(sql, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting ingredient:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

export {getAllIngredients, deleteIngredient};
