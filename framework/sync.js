const {bdd} = require('./connection.js');
const User = require('./../model/user.schema.js');
const Product = require('./../model/product.schema.js');
const Role = require('./../model/role.schema.js');

const sync = async () => {
    await Product.belongsTo(User);
    await User.belongsToMany(Role,{through: "user_has_role"});
    await bdd.sync({force: true});
}

module.exports = sync;