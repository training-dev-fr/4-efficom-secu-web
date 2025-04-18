const User = require('./../model/user.schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require('../model/role.schema.js');
require('dotenv').config();

const signin = async (req, res) => {
    try {
        let member = await Role.findOne({where: {name: "Member"}});
        const user = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            roles: [member]
        });
        return res.status(201).json(user);
    } catch (e) {
        return res.status(400).json({ error: "problème lors de la sécurisation du mot de passe" });
    }
}

const login = async (req, res) => {
    const user = await User.findOne({where: {email: req.body.email},include: [Role]});
    if(!user){
        return res.status(404).json({error: "Email ou mot de passe incorrect"})
    }
    if(!bcrypt.compareSync(req.body.password,user.password)){
        return res.status(404).json({error: "Email ou mot de passe incorrect"})
    }
    return res.status(200).json({
        id: user.id,
        email: user.email,
        token: jwt.sign({
            id: user.id,
            roles: user.roles
        },process.env.JWT_KEY)
    });
}

module.exports = {signin,login}