const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
    },
    {
        collection: "categorias",
        timestamps: true,
    }
);

const Categoria = mongoose.model("Categoria", categoriaSchema);

module.exports = Categoria;