const express = require('express');
const userRouter = require('./route/user.route.js');
const productRouter = require('./route/product.route.js');
const authRouter = require('./route/auth.route.js');

const app = express();

app.use(express.json());

app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/auth',authRouter);

module.exports = app;