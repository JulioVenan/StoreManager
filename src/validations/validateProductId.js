const validateProductId = (request, response, next) => {
  const id = request.body;
  const missingId = id.some((obj) => !obj.productId);
  
if (missingId) {
    return response.status(400).json({ message: '"productId" is required' });
  }

  return next();
};

module.exports = validateProductId;