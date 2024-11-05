const mongoose = require("mongoose");

const instructivoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    autor: {
      type: String,
      required: true,
    },
    categoria: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
      },
      nombre: String,
    },
    soloEmpleados: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: "instructivos",
    timestamps: true,
  }
);

const Instructivo = mongoose.model("Instructivo", instructivoSchema);

module.exports = Instructivo;
