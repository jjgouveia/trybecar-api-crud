const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (car) => {
  const columns = Object.keys(snakeize(car))
    .map((key) => `${key}`)
    .join(',');

  const placeholders = Object.keys(car)
    .map((_key) => '?')
    .join(',');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO cars (${columns}) VALUES (${placeholders})`,
    [...Object.values(car)],
  );

  return insertId;
};

const findById = async (id) => {
    const [[result]] = await connection.execute(
      `SELECT * FROM cars 
       WHERE id = ?`,
       [id],  
    );
    return result;
};

module.exports = {
  insert,
  findById,
};