const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const findById = async (driverId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM drivers WHERE id = ?',
    [driverId],
  );
  return camelize(result);
};

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM drivers;',
  );
  return result;
};

const insert = async (car) => {
  const columns = Object.keys(snakeize(car))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(car)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO drivers (${columns}) VALUE (${placeholders})`,
    [...Object.values(car)],
  );

  return insertId;
};

module.exports = {
  findById,
  findAll,
  insert,
};