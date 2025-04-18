let Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

let Product = Sequelize.define('product',{
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