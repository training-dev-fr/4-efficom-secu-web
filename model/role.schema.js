let {bdd} = require('./../framework/connection.js');
const {DataTypes} = require('sequelize');

let Role = bdd.define('role',{
    name: {
        type: DataTypes.STRING(255)
    }
});

module.exports = Role;