import promisePool from "../../utils/database.js";

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
    type,
  } = user;

  const sql = `INSERT INTO users (first_name, last_name, email, password, phone, address, city, postal_code, type)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    city,
    postal_code,
    type,
  ];

  try {
    const [rows] = await promisePool.execute(sql, params);
    console.log("Rows affected:", rows);

    if (rows.affectedRows === 0) {
      return false;
    }
    return { user_id: rows.insertId };
  } catch (error) {
    console.error("Error inserting user:", error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

export { addUser };
