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
      type: String, //URL DEL ACHIVO
      required: true,
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
    autor: {
      type: String,
      required: true,
    },
  },
  {
    collection: "instructivos",
    timestamps: true,
  }
);

const Instructivo = mongoose.model("Instructivo", instructivoSchema);

module.exports = Instructivo;
