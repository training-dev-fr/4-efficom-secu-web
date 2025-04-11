let orm = require('./../framework/orm.js');

let User = orm.define('user',{
    email: {
        type: "string",
        unique: true
    },
    password: {
        type: "string"
    }
});

module.exports = User;