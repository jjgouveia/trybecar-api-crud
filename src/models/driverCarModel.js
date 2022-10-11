const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (info) => {
    const columns = Object.keys(snakeize(info))
      .map((key) => `${key}`)
      .join(', ');
  
    const placeholders = Object.keys(info)
      .map((_key) => '?')
      .join(', ');
  
    const [{ insertId }] = await connection.execute(
      `INSERT INTO drivers_cars (${columns}) VALUE (${placeholders})`,
      [...Object.values(info)],
    );
  
    return insertId;
  };

  module.exports = {
    insert,
  };