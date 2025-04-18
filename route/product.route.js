const express = require('express');
const productController = require('./../controller/product.controller.js');

const router = express.Router();

router.get('/',productController.getAll);
router.get('/:id',productController.getById);

router.post('/',productController.create);

router.put('/:id',productController.update);
router.delete('/:id',productController.remove);

module.exports = router;