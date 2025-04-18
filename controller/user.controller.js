const User = require('./../model/user.schema.js');
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
    const userList = await User.findAll();
    return res.status(200).json(userList);
}

const getById = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) {
        return res.status(404).json({ error: "utilisateur non trouvé" });
    }
    return res.status(200).json(user);
}

const create = async (req, res) => {
    let hash = null;
    try {
        hash = bcrypt.hashSync(req.body.password, 10)
    } catch (e) {
        return res.status(400).json({ error: "Error: cannot generate hash for password" });
    }
    try {
        const user = await User.create({
            email: req.body.email,
            password: hash
        });
        return res.status(201).json(user);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

const update = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    } catch (e) {
        return res.status(400).json({ error: "Error: cannot generate hash for password" });
    }
    try {
        const user = await User.updateOne(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.status(201).json(user);
    } catch (e) {
        return res.status(404).json(e.message);
    }
}

const remove = async (req, res) => {
    let result = await User.destroy({
        where: {
            id: req.params.id
        }
    });
    if (result !== 1) {
        res.status(404).json({ error: "User not found" });
    }
    return res.status(204).json({ message: "User deleted" });
}

module.exports = { getAll, getById, create, update, remove };