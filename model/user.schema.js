let orm = require('./../framework/orm.js');
const {DataTypes} = require('./../framework/DataTypes.js');

let User = orm.define('user',{
    email: {
        type: DataTypes.STRING(255),
        unique: true
    },
    password: {
        type: DataTypes.STRING(255)
    }
});

module.exports = User;