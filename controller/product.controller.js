const Product = require('./../model/product.schema.js');

const getAll = async (req, res) => {
    const productList = await Product.findAll();
    return res.status(200).json(productList);
}

const getById = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) {
        return res.status(404).json({ error: "utilisateur non trouvé" });
    }
    return res.status(200).json(product);
}

const create = async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        });
        return res.status(201).json(product);
    } catch (e) {
        return res.status(400).json({ error: "problème lors de la sécurisation du mot de passe" });
    }
}

const update = async (req, res) => {
    let productToUpdate = {};
    try {
        if(req.body.name){
            productToUpdate.name = req.body.name;
        }
        if(req.body.description){
            productToUpdate.description = req.body.description;
        }
        if(req.body.price){
            productToUpdate.price = req.body.price;
        }
    } catch (e) {
        return res.status(400).json({ error: "problème lors de la sécurisation du mot de passe" });
    }
    try {
        const product = await Product.updateOne(productToUpdate, {
            where: {
                id: req.params.id
            }
        });
        return res.status(201).json(product);
    } catch (e) {
        return res.status(404).json(e.message);
    }
}

const remove = async (req, res) => {

}

module.exports = { getAll, getById, create, update, remove };