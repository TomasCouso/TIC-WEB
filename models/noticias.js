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
    autor: {
      type: String,
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
