import promisePool from '../../utils/database.js';

const getEmail = async (email) => {
  const sql = `SELECT email FROM users WHERE email = ?`;
  const [rows] = await promisePool.execute(sql, [email]);

  if (rows.length === 0) {
    return true;
  } else {
    return false;
  }
};

const addUser = async (user) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    city,
    postal_code,
  } = user;

  const sql = `INSERT INTO users (first_name, last_name, email, password, phone, address, city, postal_code)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    city,
    postal_code,
  ];

  try {
    const [rows] = await promisePool.execute(sql, params);
    console.log('Rows affected:', rows);

    if (rows.affectedRows === 0) {
      return false;
    }
    return {user_id: rows.insertId};
  } catch (error) {
    console.error('Error inserting user:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const updateUserSubscription = async (id) => {
  const sql = `
    UPDATE users
    SET is_subscribed = NOT is_subscribed
    WHERE id = ?
  `;
  const [result] = await promisePool.execute(sql, [id]);
  const updatedUser = await getUserById(id);
  return {
    user: updatedUser[0],
  };
};

const getUserById = async (id) => {
  const sql = `SELECT * FROM users WHERE id = ?`;
  const [result] = await promisePool.execute(sql, [id]);
  return result;
};

export {addUser, getEmail, updateUserSubscription, getUserById};
