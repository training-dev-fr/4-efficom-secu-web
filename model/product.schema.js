let orm = require('./../framework/orm.js');
const {DataTypes} = require('./../framework/DataTypes.js');

let Product = orm.define('product',{
    name: {
        type: DataTypes.STRING(255)
    },
    description: {
        type: DataTypes.STRING(255)
    },
    price: {
        type: DataTypes.DECIMAL(10,2)
    }
});

module.exports = Product;