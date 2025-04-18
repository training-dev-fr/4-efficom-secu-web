const Role = require("../model/role.schema");
const User = require("../model/user.schema");
const bcrypt = require('bcrypt');

exports.set = async () => {
    try{
        await User.create({
            email: "avaast@myges.fr",
            password:  bcrypt.hashSync("123456", 10),
            roles: [{
                name: "Admin"
            },{
                name: "Member"
            }]
        }, { include: [Role] });
        let member = await Role.findOne({where: {name: "Member"}});
        await User.create({
            email: "avaast2@myges.fr",
            password: "123456"
        }, { include: [Role] });
    }catch(e){
        console.error(e.errors[0].message)
    }
}