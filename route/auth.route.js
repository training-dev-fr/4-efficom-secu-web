const express = require('express');
const authController = require('./../controller/auth.controller.js');
const limiter = require("./../middleware/rateLimit.middleware.js");

const router = express.Router();

router.post('/signin',authController.signin);
router.post('/login',limiter(1,5),authController.login);

module.exports = router;