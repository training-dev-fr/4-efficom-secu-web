let Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

let User = Sequelize.define('user',{
    email: {
        type: DataTypes.STRING(255),
        unique: true
    },
    password: {
        type: DataTypes.STRING(255)
    }
});

module.exports = User;