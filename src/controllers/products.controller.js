const productsService = require('../services/products.service');
 const { typeError, errorCodeList } = require('../utils/errorCodes');

const getAll = async (request, response) => {
  const { type, message } = await productsService.getAll();
  if (type) return response.status(500).json(message);
  response.status(200).json(message);
};

const getById = async (request, response) => {
    const { id } = request.params;
    const { type, message } = await productsService.getById(id);
    if (type) {
      return response.status(typeError(type)).json({ message });
    }
    return response.status(200).json(message);
};

const registerProduct = async (request, response) => {
  const { name } = request.body;
  const { type, message } = await productsService.registerProduct(name);
  if (type) return response.status(errorCodeList.mapError(type)).json(message);
  response.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { type, message } = await productsService.updateProduct(req.body, +req.params.id);

  if (type) return res.status(typeError(type)).json({ message });

  res.status(200).json(message);
};

const deleteProduct = async (request, response) => {
  const { id } = request.params;
  const { type, message } = await productsService.deleteProduct(id);
  if (type) return response.status(typeError(type)).json({ message });
  
  return response.status(204).json(message);
};

module.exports = {
  getAll,
  getById,
  registerProduct,
  updateProduct,
  deleteProduct,
};