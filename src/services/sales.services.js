const { salesModel, productsModel } = require('../models/index');

const registerSales = async (salesList) => {
  const products = await productsModel.getAll();
  const productsIds = products.map(({ id }) => +id);
  if (salesList.some(({ productId }) => !productsIds.includes(productId))) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  const saleId = await salesModel.registerSales(salesList);
  const newSale = {
    id: saleId,
    itemsSold: salesList,
  };

  return { type: null, message: newSale };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  
  return { type: null, message: sales };
};

const getById = async (id) => {
  const sales = await salesModel.getById(id); 
 
  if (sales.length > 0) return { type: null, message: sales }; 
    
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};
const deleteSales = async (salesId) => {
  const sale = await salesModel.getById(salesId);
  const affectedRows = await salesModel.deleteSales(salesId);
  if (sale.length > 0) {
    return { type: null, message: await affectedRows };
  }
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' }; 
};

const updateSales = async (product, saleId) => {
  const salesList = await salesModel.getAll();
  const salesListIds = salesList.map(({ id }) => +id);
  if (!salesListIds.includes(saleId)) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  const newSaleId = await salesModel.updateSales(product.name, saleId);
  const newSale = await salesModel.getById(newSaleId);

  return { type: null, message: newSale };
};
module.exports = {
  registerSales,
  getAll,
  getById,
  deleteSales,
  updateSales,
};