const errorCodeList = {
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  SALE_NOT_FOUND: 404,
};

const typeError = (type) => errorCodeList[type] || 500;

module.exports = {
  errorCodeList,
  typeError,
};