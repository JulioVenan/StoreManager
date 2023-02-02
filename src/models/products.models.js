const camelize = require('camelize');
const { connection } = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [response] = await connection.execute(query);
  return camelize(response);
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[response]] = await connection.execute(query, [id]);

  return camelize(response);
};

const registerProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product],
  );

  return insertId;
};

const updateProduct = async (name, productId) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.products 
    SET 
    products.name = ?
    WHERE
    products.id = ?;`,
    [name, productId],
  );
  return affectedRows;
};
  
const deleteProduct = async (productId) => {
  const query = `DELETE FROM StoreManager.products 
    WHERE
    products.id = ?;`;
  const res = await connection.execute(query, [productId]);
  return res;
  };

module.exports = {
  getAll,
  getById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
