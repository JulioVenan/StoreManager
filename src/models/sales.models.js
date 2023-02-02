const camelize = require('camelize');
const { connection } = require('./connection');

const registerSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  const string = sales
    .map(({ productId, quantity }) => `(${insertId}, ${productId}, ${quantity})`)
    .join(',');
  
  await connection.execute(`
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES${
    string}`);
  return insertId;
};

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
    salesProd.sale_id, salesProd.product_id, salesProd.quantity, storeMan.date
FROM
    StoreManager.sales_products AS salesProd
        INNER JOIN
    StoreManager.sales AS storeMan
    ON storeMan.id = salesProd.sale_id;`,
  );
 
  return camelize(result);
};

const getById = async (id) => {
  const query = `
SELECT date, product_id AS productId, quantity 
FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS sl
ON sp.sale_id = sl.id
WHERE sale_id = ?`;
  const [result] = await connection.execute(query, [id]);
  
  return result;
};

const deleteSales = async (salesId) => {
  const query = `DELETE FROM StoreManager.sales 
    WHERE
    sales.id = ?;`;
  const result = await connection.execute(query, [salesId]);
  console.log(result);
  return result;
};
  const updateSales = async (productId, saleId) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.sales 
    SET 
    sales_products.products_id = ?
    WHERE
    sales_products.sale_id = ?;`,
    [productId, saleId],
  );
  return affectedRows;
};

module.exports = {
  registerSales,
  getAll,
  getById,
  deleteSales,
  updateSales,
};