const express = require('express');
const { productsController } = require('../controllers');
const { notEmptyInputName, minCharInputName } = require('../validations/validationRegister');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', notEmptyInputName, minCharInputName, productsController.registerProduct);
router.put('/:id', notEmptyInputName, minCharInputName, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;