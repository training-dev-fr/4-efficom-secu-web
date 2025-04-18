const express = require('express');
const userRouter = require('./route/user.route.js');
const productRouter = require('./route/product.route.js');
const authRouter = require('./route/auth.route.js');
const {connect} = require('./framework/connection.js');
const sync = require('./framework/sync.js');

const app = express();

const database = async () => {
    await connect();
    await sync();
}
database();

app.use(express.json());

app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/auth',authRouter);

module.exports = app;