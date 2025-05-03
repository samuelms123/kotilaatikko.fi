import promisePool from '../../utils/database.js';

const addGuestSubscriber = async (email) => {
  const sql = `INSERT INTO guest_subscribers (email) VALUES (?)`;

  try {
    const [result] = await promisePool.execute(sql, [email]);
    return result;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

const addNewsletter = async (newsLetter) => {
  const sql = `INSERT INTO newsletters (subject, content, image) VALUES (?, ?, ?)`;

  const params = [newsLetter.subject, newsLetter.content, newsLetter.image];

  try {
    const [rows] = await promisePool.execute(sql, params);

    if (rows.affectedRows === 0) {
      return false;
    }
    return rows;
  } catch (error) {
    console.error('Error inserting newsletter:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

const getNewsletters = async () => {
  const sql = `SELECT * FROM newsletters`;

  try {
    const [rows] = await promisePool.execute(sql);
    return rows;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

const deleteNewsletter = async (id) => {
  const sql = `DELETE FROM newsletters WHERE id = ?`;

  try {
    const [result] = await promisePool.execute(sql, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Failed to delete newsletter: ${error.message}`);
  }
};

const getSubscribers = async () => {
  const usersSql = `SELECT email FROM users WHERE is_subscribed = true`;
  const guestSql = `SELECT email FROM guest_subscribers`;

  try {
    const [userRows] = await promisePool.execute(usersSql);
    const [guestRows] = await promisePool.execute(guestSql);

    const combined = [...userRows, ...guestRows];

    return combined;
  } catch (error) {
    throw new Error(`Failed to fetch subscribers: ${error.message}`);
  }
};

export {
  addGuestSubscriber,
  addNewsletter,
  getNewsletters,
  deleteNewsletter,
  getSubscribers,
};
