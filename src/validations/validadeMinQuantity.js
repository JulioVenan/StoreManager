const validateMinQuantity = (request, response, next) => {
  const salesList = request.body;

  const missingId = salesList.some((obj) => obj.quantity <= 0);

  if (missingId) {
    return response.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

module.exports = validateMinQuantity;