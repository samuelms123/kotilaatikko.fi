import promisePool from '../../utils/database.js';

const login = async (user) => {
  const sql = `SELECT * FROM users WHERE email = ?`;

  const [rows] = await promisePool.execute(sql, [user]);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {login};
