const express = require('express');
const userRouter = require('./route/user.route.js');
const productRouter = require('./route/product.route.js');
const authRouter = require('./route/auth.route.js');
const {connect} = require('./framework/connection.js');
const sync = require('./framework/sync.js');
const { set } = require('./framework/dataset.js');
const log = require('./middleware/log.middleware.js');
const logres = require('./middleware/logres.middleware.js');

const app = express();

const database = async () => {
    await connect();
    await sync();
    await set();
}
database();

app.use(express.json());
app.use(log);
app.use(logres);

app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/auth',authRouter);

module.exports = app;