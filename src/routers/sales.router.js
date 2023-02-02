const express = require('express');
const { salesController } = require('../controllers/index');
const validateProductId = require('../validations/validateProductId');
const validateProductQuantity = require('../validations/validateProductQuantity');
const validadeMinQuantity = require('../validations/validadeMinQuantity');

const router = express.Router();

router.post('/', validateProductId,
  validateProductQuantity, validadeMinQuantity, salesController.registerSales);

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.delete('/:id', salesController.deleteSales);
router.put('/:id', validateProductQuantity, validateProductId, salesController.updateSales);

module.exports = router;