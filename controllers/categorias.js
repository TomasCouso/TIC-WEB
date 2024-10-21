const Categoria = require("../models/categorias");

const getCategorias = async (req, res) => {
    try {
        res.status(200).json(await Categoria.find());
    } catch (e) {
        res.status(500)
        .json({ error: e.message });
    }
}

const getCategoria = async (req, res) => {
    try {
        res.status(200).json(await Categoria.findById(req.params.id));
    } catch (e) {
        res.status(500)
        .json({ error: e.message });
    }
}

module.exports = {
    getCategorias,
    getCategoria
}