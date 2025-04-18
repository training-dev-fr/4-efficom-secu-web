const {bdd} = require('./connection.js');
const User = require('./../model/user.schema.js');
const Product = require('./../model/product.schema.js');

const sync = async () => {
    await bdd.sync();
}

module.exports = sync;