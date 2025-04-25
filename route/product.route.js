const express = require('express');
const productController = require('./../controller/product.controller.js');
const auth = require('../middleware/auth.middleware.js');
const limiter = require("./../middleware/rateLimit.middleware.js");

const router = express.Router();

router.get('/',() => limiter(10,100),productController.getAll);
router.get('/:id',productController.getById);

router.post('/',auth(),productController.create);

router.put('/:id',auth(),productController.update);
router.delete('/:id',auth(),productController.remove);
router.delete('/admin/:id',auth("Admin"),productController.remove);

module.exports = router;