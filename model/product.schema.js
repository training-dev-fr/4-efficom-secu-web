let bdd = require('./../framework/connection.js');
const {DataTypes} = require('sequelize');

let Product = bdd.define('product',{
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