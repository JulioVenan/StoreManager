const productsModel = require('../models/products.models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products }; 
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: product };
};

const registerProduct = async (name) => {
  const productId = await productsModel.registerProduct(name);
  const newProduct = await productsModel.getById(productId);
  return { type: null, message: newProduct };
};

const updateProduct = async (product, productId) => {
  const productsList = await productsModel.getAll();
  const productsListIds = productsList.map(({ id }) => +id);
  if (!productsListIds.includes(productId)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const newProductId = await productsModel.updateProduct(product.name, productId);
  const newProduct = await productsModel.getById(newProductId);

  return { type: null, message: newProduct };
};

const deleteProduct = async (productId) => {
  const product = await productsModel.getById(productId);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; 
  }
  const affectedRows = await productsModel.deleteProduct(productId);
  return { type: null, message: await affectedRows };
};

module.exports = {
  getAll,
  getById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
