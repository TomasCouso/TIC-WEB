const mongoose = require("mongoose");

const noticiaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    fechaPublicacion: {
      type: Date,
      default: Date.now,
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado",
      required: true,
    },
  },
  {
    collection: "noticias",
    timestamps: true,
  }
);

const Noticia = mongoose.model("Noticia", noticiaSchema);

module.exports = Noticia;
