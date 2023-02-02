const validateProductQuantity = (request, response, next) => {
 const salesList = request.body;

  const missingId = salesList.some((obj) => obj.quantity === undefined);

  if (missingId) {
    return response.status(400).json({ message: '"quantity" is required' });
  }
  return next();
};

module.exports = validateProductQuantity;