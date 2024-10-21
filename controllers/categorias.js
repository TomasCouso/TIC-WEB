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

const createCategoria = async (req, res) => {
    try {
        const nuevaCategoria = new Categoria(req.body);
        const categoriaGuardada = await nuevaCategoria.save();
        res.status(201).json(categoriaGuardada);
    } catch (e) {
        res.status(500).json({
            mensaje: e,
        });
    }
};

const updateCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );
        if (categoriaActualizada) {
            res.status(200).json(categoriaActualizada);
        } else {
            res.status(404).json({
                id,
                actualizado: false,
            });
        }
    } catch (e) {
        res.status(500).json({ mensaje: e });
    }
};

const deleteCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        const categoriaEliminada = await Categoria.findByIdAndDelete(id);
        if (categoriaEliminada) {
            res.status(200).json({ mensaje: "Categoria eliminado" });
        } else {
            res.status(404).json({ mensaje: "Categoria no encontrado" });
        }
    } catch (e) {
        res.status(500).json({ mensaje: e });
    }
};

module.exports = {
    getCategorias,
    getCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria,
}