let orm = require('./../framework/orm.js');

let Product = orm.define('product',{
    name: {
        type: "string"
    },
    description: {
        type: "string"
    },
    price: {
        type: "number"
    }
});

module.exports = Product;