const { salesService } = require('../services');
const { typeError } = require('../utils/errorCodes');

const registerSales = async (request, response) => {
  const { type, message } = await salesService.registerSales(request.body);

  if (type) return response.status(typeError(type)).json({ message });

  response.status(201).json(message);
};

const getAll = async (request, response) => {
  const { type, message } = await salesService.getAll();

  if (type) return response.status(typeError(type)).json({ message });

  response.status(200).json(message);
};

const getById = async (request, response) => {
  const { id } = request.params;
  const { type, message } = await salesService.getById(id);

  if (type) return response.status(typeError(type)).json({ message });

  return response.status(200).json(message);
};

const deleteSales = async (request, response) => {
  const { id } = request.params;
  const { type, message } = await salesService.deleteSales(id);
  if (type) return response.status(typeError(type)).json({ message });
  
  return response.status(204).json(message);
};

const updateSales = async (req, res) => {
  const { type, message } = await salesService.updateSales(req.body, +req.params.id);

  if (type) return res.status(typeError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  registerSales,
  getAll,
  getById,
  deleteSales,
  updateSales,
};